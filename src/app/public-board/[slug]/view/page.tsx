import { prisma } from "@/utils/prisma";
import { notFound } from "next/navigation";
import PublicBoard from "./PublicBoard";
import { StoreSnapshot, TLRecord } from "tldraw";

const isValidSnapshot = (data: unknown): data is StoreSnapshot<TLRecord> => {
  return (
    typeof data === "object" &&
    data !== null &&
    "store" in data &&
    "schema" in data
  );
};

const PublicView = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const whiteboardContent = await prisma.whiteboard.findUnique({
    where: { slug },
  });

  if (!whiteboardContent || !whiteboardContent?.isPublic) {
    notFound();
  }

  const content = isValidSnapshot(whiteboardContent.content)
    ? whiteboardContent.content
    : null;

  console.log(content);

  return (
    <PublicBoard title={whiteboardContent.title} initialContent={content} />
  );
};

export default PublicView;
