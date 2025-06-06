import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return NextResponse.json({ message: "User synced" });
}
