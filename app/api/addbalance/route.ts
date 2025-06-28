import prisma from "@/lib/prisma";
import { NextRequest , NextResponse } from "next/server";



export async function POST(request : NextRequest ) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || !amount) {
      return new NextResponse(JSON.stringify({ success: false, message: "Invalid input" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { netBalance: user.netBalance + amount },
    });

    return new NextResponse(JSON.stringify({ success: true, data: updatedUser }), { status: 200 });
  } catch (error) {
    console.error("Error adding balance:", error);
    return new NextResponse(JSON.stringify({ success: false, message: "Internal server error" }), { status: 500 });
  }
}