import toast from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
import { useState } from "react";

export const useDeleteWhiteboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteWhiteboardByID = async (designId: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(`whiteboard/${designId}`);
      toast.success(res?.data?.message ?? "Deleted design successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDeleteWhiteboardByID, isLoading };
};
