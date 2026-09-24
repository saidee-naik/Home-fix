import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";

export async function POST(request: Request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    const body = await request.json();

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

    const missingFields = requiredFields.filter((field) => {
      const value = body[field];

      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }
    // Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(body.email)) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid email format",
    },
    { status: 400 }
  );
}

// Validate numeric fields
const experience = Number(body.experience);
const priceMin = Number(body.priceMin);
const priceMax = Number(body.priceMax);

if (
  !Number.isFinite(experience) ||
  !Number.isFinite(priceMin) ||
  !Number.isFinite(priceMax)
) {
  return NextResponse.json(
    {
      success: false,
      message: "Experience and prices must be valid numbers",
    },
    { status: 400 }
  );
}

// Validate non-negative values
if (experience < 0 || priceMin < 0 || priceMax < 0) {
  return NextResponse.json(
    {
      success: false,
      message: "Experience and prices cannot be negative",
    },
    { status: 400 }
  );
}

// Validate price range
if (priceMax < priceMin) {
  return NextResponse.json(
    {
      success: false,
      message: "Maximum price cannot be less than minimum price",
    },
    { status: 400 }
  );
}
// Validate phone number (10-digit Indian mobile number)
const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(String(body.phone).trim())) {
  return NextResponse.json(
    {
      success: false,
      message: "Phone number must be a valid 10-digit Indian mobile number",
    },
    { status: 400 }
  );
}

// Validate text fields
const textFields = ["name", "category", "location", "description"];

const emptyTextFields = textFields.filter((field) => {
  return typeof body[field] !== "string" || body[field].trim() === "";
});

if (emptyTextFields.length > 0) {
  return NextResponse.json(
    {
      success: false,
      message: "Text fields cannot be empty",
      fields: emptyTextFields,
    },
    { status: 400 }
  );
}
// Check for an existing provider with the same email
const existingProvider = await Provider.findOne({
  email: body.email.trim().toLowerCase(),
});

if (existingProvider) {
  return NextResponse.json(
    {
      success: false,
      message: "A provider with this email already exists",
    },
    { status: 409 }
  );
}

    // Create a new provider
    const provider = await Provider.create({
  name: body.name,
  phone: body.phone,
  email: body.email,
  category: body.category,
  location: body.location,
  experience: Number(body.experience),
  priceMin: Number(body.priceMin),
  priceMax: Number(body.priceMax),
  imageUrl: body.imageUrl || "",
  description: body.description,
  status: "pending",
});
    // 4. Return the saved provider
    return NextResponse.json(
      {
        success: true,
        message: "Provider registered successfully",
        provider,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Provider registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register provider",
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Fetch approved providers
    const providers = await Provider.find({
      status: "approved",
    }).sort({ createdAt: -1 });

    // 3. Return providers
    return NextResponse.json(
      {
        success: true,
        count: providers.length,
        providers,
      },
      { status: 200 }
    );
} catch (error: any) {
  console.error("Provider registration error:", error);

  // MongoDB duplicate key error
  if (error.code === 11000) {
    return NextResponse.json(
      {
        success: false,
        message: "A provider with this email already exists",
      },
      { status: 409 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Failed to register provider",
    },
    { status: 500 }
  );
}
}