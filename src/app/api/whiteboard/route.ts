import { generateSlug } from "@/utils/helper";
import { prisma } from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
        userId: dbUser.id,
        content: { id: "abc", pages: {}, pageState: {} },
        slug: generateSlug(title),
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
