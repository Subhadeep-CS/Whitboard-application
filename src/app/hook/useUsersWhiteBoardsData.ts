"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { UserDesignDataType } from "@/types/component.type";

export const useUsersWhiteBoardsData = () => {
  const [whiteBoardsData, setWhiteBoardsData] = useState<UserDesignDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserWhiteBoards = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("auth-user");
      setWhiteBoardsData([...res.data]);
    } catch (error) {
      console.log("failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserWhiteBoards();
  }, []);

  const refetch = () => {
    console.log("call");
    fetchUserWhiteBoards();
  };

  return { whiteBoardsData, isLoading, refetch };
};
