import { NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validators";

// TODO: In Step 6 of section 12, replace this mock handler with the real MongoDB
// Mongoose connection (QuoteRequest model) and SMTP / Resend email dispatch.
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = quoteRequestSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Generate a temporary mock reference number
    const mockReferenceId = `QT-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    return NextResponse.json({
      success: true,
      referenceId: mockReferenceId,
      message: "Quote request received. Our dispatch team will reply within 2 business hours.",
      data: result.data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload." },
      { status: 500 }
    );
  }
}

