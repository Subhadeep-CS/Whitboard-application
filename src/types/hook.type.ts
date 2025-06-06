export interface UseCreateWhiteBoardType {
  isLoading: boolean;
  handleCreateWhiteBoard: (title: string) => Promise<void>;
}
