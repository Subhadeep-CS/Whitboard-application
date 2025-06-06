"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAddUser } from "./hook/useAddUser";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { addUser } = useAddUser();
  useEffect(() => {
    if (isSignedIn) {
      addUser();
      router.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center max-w-[800px] !space-y-4">
        <h1 className="text-5xl font-bold">
          WELCOME TO WHITE BOARD APPLICATION!
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          YOU CAN CREATE,EDIT YOU OWN DESIGN
        </p>
        <SignInButton mode="modal">
          <button className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-lg font-semibold px-16 py-3 rounded-full">
            SIGN IN TO CONTINUE →
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
