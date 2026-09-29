import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AdminTokenPayload extends JwtPayload {
  adminId: string;
  email: string;
  role: string;
}

export async function verifyAdmin(): Promise<AdminTokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return null;
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return null;
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as AdminTokenPayload;

    if (decoded.role !== "admin") {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Admin authentication error:", error);
    return null;
  }
}