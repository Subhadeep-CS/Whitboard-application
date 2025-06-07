import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

export const useStatusUpdate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitPublish = async (
    designId: string,
    state: "draft" | "publish"
  ) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(`whiteboard/${designId}`, {
        state,
      });
      toast.success(response?.data?.message ?? "State updated successfully");
      return response.data;
    } catch (error: unknown) {
      console.error("Toggle publish error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmitPublish, isLoading };
};
