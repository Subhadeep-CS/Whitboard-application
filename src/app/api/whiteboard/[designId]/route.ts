import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { designId: string } }
) {
  try {
    const body = await request.json();
    const { content, state } = body;

    const whiteboard = await prisma.whiteboard.update({
      where: { id: params.designId },
      data: {
        content,
        state: state || "draft",
      },
    });

    return NextResponse.json(whiteboard);
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: "Failed to update white board" },
      { status: 500 }
    );
  }
}
