"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import firebaseConfig from "@/lib/firebaseConfig";

import InputField from "@/app/components/InputField";
import Loader from "@/app/components/Loader";
import { useToast } from "@/app/components/Toast/ToastContext";

import styles from "../../../_styles/auth.module.css";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseConfig);
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = signInData;

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword( auth, email, password );

      const user = userCredential.user;
      const token = await user.getIdToken();
      showToast("You have signed in successfully.", 3000, "success");
      localStorage.setItem("authToken", token);
      window.location.href = "/";

    } catch (error: unknown) {
      setIsLoading(false);
      const errStr =
      error instanceof Error ? error.message : "Something went wrong";
      console.error(errStr);
      showToast("Invalid Credentials", 3000, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("authToken", await user.getIdToken());
      window.location.href = "/";
    } catch (error: unknown) {
      const errStr = error instanceof Error ? error.message : "Something went wrong";
      console.error(errStr);
      showToast("Invalid Credentials", 3000, "error");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <form
        className={`${styles.authWrapper} border border-gray-200 rounded-lg bg-white p-8 shadow-sm max-w-[400px] w-full mx-auto my-8`}
        onSubmit={handleSignIn}
      >
        <div className={styles.authHeader}>
          <h2 className={styles.authHeading}>Log In</h2>
          <span className="eb-font text-base">
            It’s great to see you👋, Sign In to your account below.
          </span>
        </div>

        <InputField
          label="Email"
          type="text"
          placeholder="Username@gmail.com"
          id="email"
          value={signInData.email}
          onChange={(e) =>
            setSignInData({ ...signInData, email: e.target.value })
          }
          required
        />

        <div className="w-full relative mb-3">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={signInData.password}
            onChange={(e) =>
              setSignInData({ ...signInData, password: e.target.value })
            }
            showPassword={showPassword}
            onToggleVisibility={togglePasswordVisibility}
            required
          />
        </div>

        <div className="w-full mb-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <div className="mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300 w-full">
          <p className="mx-4 mb-0 text-center text-highlight">
            Or Continue Logging In with
          </p>
        </div>

        <div className="w-full mb-6">
          <button
            className="btn btn-bordered w-full flex justify-center"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <Image src="/google-icon.svg" alt="google" height={24} width={24} />
          </button>
        </div>

        <div className="text-center w-full">
          <p className="text-[#5E718D]">
            Don’t have an account?{" "}
            <Link className="text-primary" href="/auth/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
