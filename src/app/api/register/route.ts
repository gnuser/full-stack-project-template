import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Simple validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create user with the password field
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      // Explicitly select the fields we want to return
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        // Don't include password in the result
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
