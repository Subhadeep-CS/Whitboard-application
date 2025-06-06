import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { designId: string } }
) {
  const user = await currentUser();

  if (!user) {
    NextResponse.json({ error: "Unauthorized" });
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user?.id },
  });

  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const designId = params.designId;
    const whiteboard = await prisma.whiteboard.findUnique({
      where: { id: designId },
    });

    if (!whiteboard || whiteboard.userId !== dbUser.id) {
      return NextResponse.json(
        { error: "Whiteboard not found or access denied" },
        { status: 403 }
      );
    }

    await prisma.whiteboard.delete({
      where: { id: designId },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ message: "Whiteboard deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Something went wrong for delete" },
      { status: 500 }
    );
  }
}
