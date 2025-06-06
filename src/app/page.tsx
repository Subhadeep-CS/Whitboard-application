"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center max-w-[800px] !space-y-4">
        <h1 className="text-5xl font-bold">
          WELCOME TO WHITE BOARD APPLICATION!
        </h1>
        {/* Subtitle */}
        <p className="text-gray-300 mt-4 text-lg">
          YOU CAN CREATE,EDIT YOU OWN DESIGN
        </p>

        {/* Button with hover effect */}
        {isSignedIn ? (
          <Link
            href="/white-board"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 transition-all text-white text-lg font-semibold px-16 py-3 rounded-full"
          >
            Go to Whiteboard →
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 transition-all text-white text-lg font-semibold px-16 py-3 rounded-full">
              SIGN IN TO CONTINUE →
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
