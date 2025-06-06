import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, userId } = body;

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Missing white board name or userId" },
        { status: 400 }
      );
    }

    const whiteboard = await prisma.whiteboard.create({
      data: {
        title,
        state: "draft",
        userId,
        content: { id: "abc", pages: {}, pageState: {} },
      },
    });

    return NextResponse.json(whiteboard);
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: "Failed to create white board" },
      { status: 500 }
    );
  }
}
