import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = newsletterSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues?.[0]?.message || "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully! Thank you for joining YOUBAY trade updates.",
      email: result.data.email,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }
}
