import { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { AddCommentDataType, CommentType } from "@/types/hook.type";

export function useComments(designId: string) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get<CommentType[]>(
        `/whiteboard/${designId}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (commentData: AddCommentDataType) => {
    try {
      const res = await axiosInstance.post<CommentType>(
        `/whiteboard/${designId}/comments`,
        commentData
      );
      setComments((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  useEffect(() => {
    if (designId) {
      fetchComments();
    }
  }, [designId]);

  return { comments, isLoading, addComment, fetchComments };
}
