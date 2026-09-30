import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import { verifyAdmin } from "@/lib/adminAuth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Check admin authentication
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

    const { id } = await params;

    const provider = await Provider.findById(id);

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Provider not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      provider,
    });
  } catch (error) {
    console.error("Admin provider GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch provider",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Check admin authentication
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

    const { id } = await params;
    const body = await request.json();

    const { status } = body;

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid status. Use pending, approved, or rejected.",
        },
        { status: 400 }
      );
    }

    // Find and update provider
    const provider = await Provider.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Provider not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Provider ${status} successfully`,
      provider,
    });
  } catch (error) {
    console.error("Admin provider PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update provider",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    // Check admin authentication
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

    const { id } = await params;

    const provider = await Provider.findByIdAndDelete(id);

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Provider not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Provider deleted successfully",
      provider,
    });
  } catch (error) {
    console.error("Admin provider DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete provider",
      },
      { status: 500 }
    );
  }
}