import { verifyAdmin } from "@/lib/adminAuth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";

export async function GET(request: Request) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    // YOUR EXISTING GET CODE CONTINUES HERE...

    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";

    // Pagination
    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 5, 1),
      100
    );

    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};

    // Status filter
    if (
      status &&
      ["pending", "approved", "rejected"].includes(status)
    ) {
      filter.status = status;
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Search by name, email, or location
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "name_asc":
        sortOption = { name: 1 };
        break;

      case "name_desc":
        sortOption = { name: -1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // Get total matching providers
    const totalProviders = await Provider.countDocuments(filter);

    // Get providers for current page
    const providers = await Provider.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProviders / limit);

    return NextResponse.json({
      success: true,
      count: providers.length,
      pagination: {
        page,
        limit,
        totalPages,
        totalProviders,
      },
      providers,
    });
  } catch (error) {
    console.error("Admin providers GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch providers",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
      name,
      phone,
      email,
      category,
      location,
      experience,
      priceMin,
      priceMax,
      imageUrl,
      description,
    } = body;

    if (
      !name ||
      !phone ||
      !email ||
      !category ||
      !location ||
      experience === undefined ||
      priceMin === undefined ||
      priceMax === undefined ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields",
        },
        { status: 400 }
      );
    }

    const existingProvider = await Provider.findOne({ email });

    if (existingProvider) {
      return NextResponse.json(
        {
          success: false,
          message: "A provider with this email already exists",
        },
        { status: 409 }
      );
    }

    const provider = await Provider.create({
      name,
      phone,
      email,
      category,
      location,
      experience: Number(experience),
      priceMin: Number(priceMin),
      priceMax: Number(priceMax),
      imageUrl: imageUrl || "",
      description,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Provider added successfully",
        provider,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin provider POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add provider",
      },
      { status: 500 }
    );
  }
}