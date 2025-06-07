/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Whiteboard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Whiteboard" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Whiteboard_slug_key" ON "Whiteboard"("slug");
