import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "../../../utils/hygraph";
import { GET_USER_BY_EMAIL } from "../../../utils/queries";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 },
      );
    }

    const data: any = await client.request(GET_USER_BY_EMAIL, { email });
    const user = data.appUsers[0];

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      "secret-key",
      { expiresIn: "7d" },
    );

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
