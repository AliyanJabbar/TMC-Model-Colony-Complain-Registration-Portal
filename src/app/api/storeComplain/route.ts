import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const { formData, department } = await req.json();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.message ||
      !department
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required form values" },
        { status: 400 }
      );
    }

    const complain = {
      _type: "complain",
      department: department,
      customerDetails: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      message: formData.message,
      complainDate: new Date().toISOString(),
      status: "pending",
    };

    const createdComplain = await client.create(complain);

    return NextResponse.json(
      { success: true, complainId: createdComplain._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating complain:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create complain" },
      { status: 500 }
    );
  }
}
