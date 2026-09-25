import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid provider ID",
        },
        { status: 400 }
      );
    }

    // Fetch only approved provider
    const provider = await Provider.findOne({
      _id: id,
      status: "approved",
    });

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Provider not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        provider,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Provider details error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch provider",
      },
      { status: 500 }
    );
  }
}