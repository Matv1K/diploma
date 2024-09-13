"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";

import { Input, Button } from "@/components";

import { TOAST_MESSAGES } from "../constants";

import { registerUser } from "@/services/users/userService";

const notify = () => toast.success(TOAST_MESSAGES.SIGN_UP);

const SignUp: React.FC = () => {
  const [inputData, setInputData] = useState<any>(null);

  const { push } = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    try {
      await registerUser({
        name: inputData.name,
        lastName: inputData.lastName,
        password: inputData.password,
        email: inputData.email,
      });

      push("/");

      // notify();
    } catch (error) {}
  };

  const handleGoogleSignUp = () => {
    console.log("google");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <main className={styles.signUp}>
      <h2>Sign up</h2>

      <form className={styles.form} autoComplete="off">
        <Input
          className={styles.input}
          type="text"
          placeholder="Enter your name"
          onChange={handleInputChange}
          name="name"
          required
        />

        <Input
          className={styles.input}
          type="text"
          placeholder="Enter your last name"
          onChange={handleInputChange}
          name="lastName"
          required
        />

        <Input
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          onChange={handleInputChange}
          name="email"
          required
          autoComplete="off"
        />

        <Input
          className={styles.input}
          type="password"
          placeholder="Enter your password"
          title="Password must have at least 8 characters"
          onChange={handleInputChange}
          name="password"
          required
          autoComplete="off"
        />

        <div className={styles.formInfo}>
          <div className={styles.buttons}>
            <Button onClick={handleSignUp}>Sign up</Button>
            <Button onClick={handleGoogleSignUp}>Sign up with Google</Button>
          </div>

          <span>
            Already have an account?{" "}
            <Link className={styles.signInLink} href="/sign-in">
              Sign in
            </Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </main>
  );
};

export default SignUp;
