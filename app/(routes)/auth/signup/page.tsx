'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";

import firebaseConfig from "@/lib/firebaseConfig";
import { validateForm } from "@/utils";

import InputField from "@/app/components/InputField";
import { useToast } from "@/app/components/Toast/ToastContext";
import Loader from "@/app/components/Loader";

import styles from '../../../_styles/auth.module.css';

export default function SignUp() {
  const router = useRouter();
  const { showToast } = useToast();
  const auth = getAuth(firebaseConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.id]: e.target.value
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.id]: ''
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = signUpData;

    const { isFormValid, errors: validationErrors } = validateForm(email, password);
    setErrors(validationErrors);

    if (isFormValid) {
      try {
        setIsLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        showToast('You have successfully signed up.', 3000, 'success');
        router.push('/auth/login');
      } catch (error: unknown) {
        setIsLoading(false);
        const errStr = (error as Error).message || 'Something went wrong';
        showToast(errStr.replace(/Firebase:_?/g, ''), 3000, 'error');
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
    <form  className={`${styles.authWrapper} border border-gray-200 rounded-lg bg-white p-8 shadow-sm max-w-[400px] w-full mx-auto my-8`} onSubmit={handleSignUp}>
      <div className={styles.authHeader}>
        <h2 className={styles.authHeading}>Sign Up</h2>
        <p>Welcome👋, Sign up below.</p>
      </div>

      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        id='email'
        value={signUpData.email}
        onChange={handleInputChange}
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        id="password"
        value={signUpData.password}
        onChange={handleInputChange}
        showPassword={showPassword}
        onToggleVisibility={togglePasswordVisibility}
        required
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <button className="btn btn-primary w-full mt-4" disabled={isLoading} type="submit">
        {isLoading ?
        <div className="flex items-center justify-center">
          <Loader />
        </div> : 'Sign Up'}
      </button>
      <div className="text-center w-full">
        <p className="text-[#5E718D]">
          Already have an account?{" "}
          <Link className="text-primary font-bold" href="/auth/login">
            Log In
          </Link>
        </p>
      </div>
    </form>
    </div>
  );
}
