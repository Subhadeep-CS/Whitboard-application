import { prisma } from "@/utils/prisma";
import { notFound } from "next/navigation";
import { Tldraw } from "tldraw";

const PublicView = async ({ params }: { params: { slug: string } }) => {
  const whiteboardContent = await prisma.whiteboard.findUnique({
    where: { slug: params.slug },
  });

  if (!whiteboardContent || !whiteboardContent?.isPublic) {
    notFound();
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{whiteboard.title}</h2>
      <Tldraw initialContent={whiteboard.content} readOnly />
    </div>
  );
};

export default PublicView;
