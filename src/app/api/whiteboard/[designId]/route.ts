import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ designId: string }> }
) {
  try {
    const { designId } = await params;
    const body = await request.json();
    const { content, state } = body;

    const whiteboard = await prisma.whiteboard.update({
      where: { id: designId },
      data: {
        ...(content && { content }),
        ...(state && {
          state,
          isPublic: state === "publish",
        }),
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
  { params }: { params: Promise<{ designId: string }> }
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
    const { designId } = await params;
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
