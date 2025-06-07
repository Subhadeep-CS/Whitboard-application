import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ designId: string }> }
) {
  const { designId } = await params;
  try {
    const comments = await prisma.comment.findMany({
      where: { whiteboardId: designId },
      include: { author: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ designId: string }> }
) {
  const { designId } = await params;
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text, x, y } = await request.json();

  if (!text || typeof x !== "number" || typeof y !== "number") {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        x,
        y,
        whiteboardId: designId,
        authorId: dbUser.id,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
