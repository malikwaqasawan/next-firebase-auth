"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!authToken) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="border border-gray-200 rounded-lg bg-white p-8 shadow-sm max-w-[400px] w-full mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-4">Sign In Successful</h2>
        <p className="mb-4">Welcome back! You have successfully signed in.</p>
        <div className="mb-4">
          <p>Click the button below to sign out.</p>
          <button className="btn btn-primary w-full mt-4" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
