"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/firebase/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordError("Please check again");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Not a match!");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      await signUp(email, password);
      router.push("/");
    } catch (error) {
      setPasswordError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="bg-lightGrey flex flex-col sm:h-[100vh] py-10 px-1 sm:p-0 justify-center items-center">
      <div className="lg:w-[30%] mx-auto my-auto">
        <div className="flex gap-2 items-center justify-center max-sm:justify-start max-sm:ps-8">
          <Image src={"/logo.png"} alt="logo" height={33} width={33} />
          <div className="text-default font-bold text-2xl">devlinks</div>
        </div>
        <form
          onSubmit={handleSignup}
          className="sm:bg-white mt-4 p-10 rounded-lg"
        >
          <h2 className="text-default text-3xl font-[700] pb-6">
            Create Account
          </h2>
          <div className="text-center max-sm:text-start text-default pb-4">
            Let&apos;s get you started sharing your links
          </div>
          <Input
            border="border"
            containerClass="mb-6"
            inputType="email"
            label="Email address"
            logoSrc="mail.png"
            placeholder="e.g alex@email.com"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            required
            error={emailError} 
          />
          <Input
            border="border"
            containerClass="mb-6"
            inputType="password"
            label="Create Password"
            logoSrc="lock.png"
            placeholder="At least 8 characters"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            required
            error={passwordError} 
          />
          <Input
            border="border"
            containerClass="mb-6"
            inputType="password"
            label="Confirm Password"
            logoSrc="lock.png"
            placeholder="At least 8 characters"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={confirmPasswordError} 
          />
          <p className="text-default text-xs my-6">
            Password must contain at least 8 characters
          </p>
          <Button
            bgColor="primary"
            value="Create new account"
            width={"full"}
            radius={"md"}
            textColor="white"
            otheClasses={"p-2 mt-2 mb-8"}
            hover="bg-hover"
            type="submit"
          />
          <div className="text-default max-sm:text-center">
            Already have an account?{" "}
            <span className="text-primary max-sm:block">
              <Link href={"/login"}>Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
