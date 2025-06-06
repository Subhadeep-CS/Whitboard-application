import WhiteBoard from "@/component/WhiteBoard";

const WhiteBoardPage = async ({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) => {
  const { boardId } = await params;
  return <WhiteBoard />;
};

export default WhiteBoardPage;
