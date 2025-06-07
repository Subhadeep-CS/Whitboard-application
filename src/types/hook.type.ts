export interface UseCreateWhiteBoardType {
  isLoading: boolean;
  handleCreateWhiteBoard: (title: string) => Promise<void>;
}

export interface CommentType {
  id: string;
  text: string;
  x: number;
  y: number;
  createdAt: string;
  author: {
    id: string;
    email: string;
  };
}

export interface AddCommentDataType {
  text: string;
  x: number;
  y: number;
}
