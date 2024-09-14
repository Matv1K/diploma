"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import styles from "./page.module.scss";

import Link from "next/link";

import { Button, Input } from "@/components";

import { TOAST_MESSAGES } from "../constants";

import { loginUser } from "@/services/users/userService";

const notifySuccess = () => toast.success(TOAST_MESSAGES.SIGN_IN);
const notifyError = () => toast.error(TOAST_MESSAGES.ADD_TO_CART);

const SignIn: React.FC = () => {
  const [inputData, setInputData] = useState<any>(null);

  const { push } = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: any) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      await loginUser({ email: inputData.email, password: inputData.password });

      push("/");
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  return (
    <main className={styles.signIn}>
      <h2>Sign in</h2>

      <form className={styles.form}>
        <Input
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          onChange={handleInputChange}
          name="email"
        />

        <Input
          className={styles.input}
          type="password"
          placeholder="Enter your password"
          title="Password must have at least 8 characters"
          onChange={handleInputChange}
          name="password"
        />

        <div className={styles.formInfo}>
          <Button onClick={handleSignIn}>Sign in</Button>

          <span>
            Don't have an account?{" "}
            <Link className={styles.signUpLink} href="/sign-up">
              Sign up
            </Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </main>
  );
};

export default SignIn;
