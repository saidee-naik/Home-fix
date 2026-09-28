import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";

/**
 * Escape special regex characters so user input
 * cannot accidentally change our MongoDB regex.
 */
function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * GET /api/providers
 *
 * Public provider discovery API.
 *
 * Supported query parameters:
 *
 * category       -> Plumbing, Electrical, Cleaning...
 * location       -> Ponda, Margao...
 * search         -> Search provider name/category/location/description
 * minExperience  -> Minimum years of experience
 * maxExperience  -> Maximum years of experience
 * minPrice       -> Minimum price
 * maxPrice       -> Maximum price
 * page           -> Page number
 * limit          -> Results per page (max 50)
 * sortBy         -> createdAt | experience | priceMin | priceMax | name
 * order          -> asc | desc
 *
 * Example:
 * /api/providers?category=Electrical&location=Ponda
 *
 * IMPORTANT:
 * Only APPROVED providers are returned.
 */
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // --------------------------------------------------
    // Read query parameters
    // --------------------------------------------------

    const category = searchParams.get("category")?.trim() || "";
    const location = searchParams.get("location")?.trim() || "";
    const search = searchParams.get("search")?.trim() || "";

    const minExperienceParam =
      searchParams.get("minExperience");

    const maxExperienceParam =
      searchParams.get("maxExperience");

    const minPriceParam =
      searchParams.get("minPrice");

    const maxPriceParam =
      searchParams.get("maxPrice");

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const sortByParam =
      searchParams.get("sortBy") || "createdAt";

    const orderParam =
      searchParams.get("order") || "desc";

    // --------------------------------------------------
    // Pagination validation
    // --------------------------------------------------

    const page = Math.max(
      Number(pageParam) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(limitParam) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    // --------------------------------------------------
    // Number validation
    // --------------------------------------------------

    const minExperience =
      minExperienceParam !== null
        ? Number(minExperienceParam)
        : undefined;

    const maxExperience =
      maxExperienceParam !== null
        ? Number(maxExperienceParam)
        : undefined;

    const minPrice =
      minPriceParam !== null
        ? Number(minPriceParam)
        : undefined;

    const maxPrice =
      maxPriceParam !== null
        ? Number(maxPriceParam)
        : undefined;

    if (
      (minExperience !== undefined &&
        !Number.isFinite(minExperience)) ||
      (maxExperience !== undefined &&
        !Number.isFinite(maxExperience)) ||
      (minPrice !== undefined &&
        !Number.isFinite(minPrice)) ||
      (maxPrice !== undefined &&
        !Number.isFinite(maxPrice))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Numeric filters must contain valid numbers.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Validate ranges
    // --------------------------------------------------

    if (
      minExperience !== undefined &&
      maxExperience !== undefined &&
      minExperience > maxExperience
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Minimum experience cannot be greater than maximum experience.",
        },
        { status: 400 }
      );
    }

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Minimum price cannot be greater than maximum price.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Build MongoDB filter
    // --------------------------------------------------

    const filter: Record<string, unknown> = {
      // Public discovery ONLY shows approved providers
      status: "approved",
    };

    // --------------------------------------------------
    // CATEGORY FILTER
    // --------------------------------------------------
    //
    // Exact match, but case-insensitive.
    //
    // Electrical -> matches Electrical
    // electrical -> matches Electrical
    // ELECTRICAL -> matches Electrical
    //
    // It will NOT match Plumbing.
    // --------------------------------------------------

    if (category) {
      filter.category = {
        $regex: `^${escapeRegex(category)}$`,
        $options: "i",
      };
    }

    // --------------------------------------------------
    // LOCATION FILTER
    // --------------------------------------------------
    //
    // Partial match, case-insensitive.
    //
    // Ponda -> Ponda
    // ponda -> Ponda
    // Goa -> Margao, Goa
    // --------------------------------------------------

    if (location) {
      filter.location = {
        $regex: escapeRegex(location),
        $options: "i",
      };
    }

    // --------------------------------------------------
    // SEARCH FILTER
    // --------------------------------------------------

    if (search) {
      const searchRegex = {
        $regex: escapeRegex(search),
        $options: "i",
      };

      filter.$or = [
        { name: searchRegex },
        { category: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
      ];
    }

    // --------------------------------------------------
    // EXPERIENCE FILTER
    // --------------------------------------------------

    if (
      minExperience !== undefined ||
      maxExperience !== undefined
    ) {
      const experienceFilter: Record<string, number> = {};

      if (minExperience !== undefined) {
        experienceFilter.$gte = minExperience;
      }

      if (maxExperience !== undefined) {
        experienceFilter.$lte = maxExperience;
      }

      filter.experience = experienceFilter;
    }

    // --------------------------------------------------
    // PRICE FILTER
    // --------------------------------------------------

    if (
      minPrice !== undefined ||
      maxPrice !== undefined
    ) {
      const priceFilter: Record<string, number> = {};

      if (minPrice !== undefined) {
        priceFilter.$gte = minPrice;
      }

      if (maxPrice !== undefined) {
        priceFilter.$lte = maxPrice;
      }

      filter.priceMin = priceFilter;
    }

    // --------------------------------------------------
    // SORTING
    // --------------------------------------------------

    const allowedSortFields = [
      "createdAt",
      "experience",
      "priceMin",
      "priceMax",
      "name",
    ];

    const sortBy = allowedSortFields.includes(sortByParam)
      ? sortByParam
      : "createdAt";

    const order = orderParam.toLowerCase() === "asc"
      ? 1
      : -1;

    const sort: Record<string, 1 | -1> = {
      [sortBy]: order,
    };

    // --------------------------------------------------
    // DATABASE QUERIES
    // --------------------------------------------------

    const total =
      await Provider.countDocuments(filter);

    const providers = await Provider.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // --------------------------------------------------
    // PAGINATION INFORMATION
    // --------------------------------------------------

    const totalPages =
      Math.ceil(total / limit);

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        count: providers.length,

        providers,

        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },

        filters: {
          category: category || null,
          location: location || null,
          search: search || null,
          minExperience:
            minExperience ?? null,
          maxExperience:
            maxExperience ?? null,
          minPrice:
            minPrice ?? null,
          maxPrice:
            maxPrice ?? null,
          sortBy,
          order:
            order === 1
              ? "asc"
              : "desc",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Provider discovery error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch service providers.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/providers
 *
 * Registers a new service provider.
 *
 * New providers are ALWAYS created as "pending".
 * They must be approved before appearing
 * in public provider discovery.
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // --------------------------------------------------
    // Required fields
    // --------------------------------------------------

    const requiredFields = [
      "name",
      "phone",
      "email",
      "category",
      "location",
      "experience",
      "priceMin",
      "priceMax",
      "description",
    ];

    const missingFields = requiredFields.filter(
      (field) => {
        const value = body[field];

        return (
          value === undefined ||
          value === null ||
          value === ""
        );
      }
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
          missingFields,
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Clean input
    // --------------------------------------------------

    const name = String(body.name).trim();
    const phone = String(body.phone).trim();
    const email = String(body.email)
      .trim()
      .toLowerCase();
    const category = String(body.category).trim();
    const location = String(body.location).trim();
    const description =
      String(body.description).trim();

    // --------------------------------------------------
    // Text validation
    // --------------------------------------------------

    if (
      !name ||
      !category ||
      !location ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, category, location and description cannot be empty.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Email validation
    // --------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Phone validation
    // --------------------------------------------------

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number must be a valid 10-digit Indian mobile number.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Number conversion
    // --------------------------------------------------

    const experience =
      Number(body.experience);

    const priceMin =
      Number(body.priceMin);

    const priceMax =
      Number(body.priceMax);

    if (
      !Number.isFinite(experience) ||
      !Number.isFinite(priceMin) ||
      !Number.isFinite(priceMax)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Experience and prices must be valid numbers.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Non-negative validation
    // --------------------------------------------------

    if (
      experience < 0 ||
      priceMin < 0 ||
      priceMax < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Experience and prices cannot be negative.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Price validation
    // --------------------------------------------------

    if (priceMax < priceMin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Maximum price cannot be less than minimum price.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Duplicate email check
    // --------------------------------------------------

    const existingProvider =
      await Provider.findOne({
        email,
      });

    if (existingProvider) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A provider with this email already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // Create provider
    // --------------------------------------------------
    //
    // IMPORTANT:
    // We deliberately DO NOT take status from the
    // request body.
    //
    // Every new provider starts as pending.
    // --------------------------------------------------

    const provider =
      await Provider.create({
        name,
        phone,
        email,
        category,
        location,
        experience,
        priceMin,
        priceMax,
        imageUrl:
          body.imageUrl
            ? String(body.imageUrl).trim()
            : "",
        description,

        status: "pending",
      });

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Provider registered successfully. Waiting for approval.",
        provider,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Provider registration error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to register provider.",
      },
      { status: 500 }
    );
  }
}