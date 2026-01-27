import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // ← expire cookie immediately
    path: "/",
  });

  return NextResponse.json({ success: true, message: "user logged out" });
}
