"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(""); 
    setPasswordError(""); 

    let hasError = false;

    if (email.trim() === "") {
      setEmailError("Cannot be empty");
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email");
      hasError = true;
    }

    if (password.trim() === "") {
      setPasswordError("Cannot be empty");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      await signIn(email, password);
      router.push("/"); 
    } catch (error) {
      setPasswordError(
        "Failed to log in."
      );
      setEmailError(
        "Failed to log in."
      );
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
          onSubmit={handleLogin}
          className="sm:bg-white mt-4 p-10 rounded-lg"
        >
          <h2 className="text-default text-3xl font-[700] pb-6">Login</h2>
          <div className="text-center max-sm:text-start text-default pb-4">
            Add your details below to get back into the app
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
            label="Password"
            logoSrc="lock.png"
            placeholder="Enter your password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            required
            error={passwordError}
          />
          {/* {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>} */}
          <Button
            bgColor="primary"
            value="Login"
            width={"full"}
            radius={"md"}
            textColor="white"
            otheClasses={"p-2 mt-6 mb-8"}
            hover="bg-hover"
            type="submit"
          />
          <div className="text-default max-sm:text-center">
            Don&apos;t have an account?{" "}
            <span className="text-primary max-sm:block">
              {" "}
              <Link href={"/sign-up"}>Create account</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
