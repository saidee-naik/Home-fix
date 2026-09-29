import { verifyAdmin } from "@/lib/adminAuth";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Provider from "@/models/Provider";

export async function GET() {
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

    const [
      total,
      pending,
      approved,
      rejected,
    ] = await Promise.all([
      Provider.countDocuments(),
      Provider.countDocuments({ status: "pending" }),
      Provider.countDocuments({ status: "approved" }),
      Provider.countDocuments({ status: "rejected" }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total,
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error("Provider stats error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch provider statistics",
      },
      { status: 500 }
    );
  }
}