import axiosInstance from "../services/axiosInstance";

export const useAddUser = () => {
  const addUser = async () => {
    try {
      await axiosInstance.post("auth-user");
      console.log("User added database");
    } catch (error) {
      console.error("Failed to added user:", error);
    }
  };

  return { addUser };
};
