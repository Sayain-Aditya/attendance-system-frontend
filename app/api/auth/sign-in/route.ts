import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.json();
  console.log("formdata api", formData);

  //post api call to backend
  const response = await fetch(
    "https://rfidattendance-mu.vercel.app/api/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error("Invalid Email or Password");
  }

  const data = await response.json();
  console.log("user", data.user);

  if (!data)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const session = await createSession(data.user);
  console.log("session", session);
  const user = data.user;
  return NextResponse.json({ user });
}
