export interface UserDesignDataType {
  title: string;
  state: "draft" | "publish";
  updatedAt: string;
  id: string;
  slug: string | null;
}
