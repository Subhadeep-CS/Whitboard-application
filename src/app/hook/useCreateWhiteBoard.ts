import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import { UseCreateWhiteBoardType } from "@/types/hook.type";

export const useCreateWhiteBoard = (): UseCreateWhiteBoardType => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateWhiteBoard = async (title: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("whiteboard", {
        title,
        userId: user?.id,
      });
      router.push(`/white-board/${res.data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error to creating whiteboard");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateWhiteBoard, isLoading };
};
