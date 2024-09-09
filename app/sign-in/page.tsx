"use client";

import React from "react";

import styles from "./page.module.scss";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";

import { Input, Button } from "@/components";

import { TOAST_MESSAGES } from "@/constants";

const notify = () => toast.success(TOAST_MESSAGES.SIGN_IN);

const SignIn: React.FC = () => {
  const handleSignIn = (e: any) => {
    e.preventDefault();

    notify();
  };

  return (
    <main>
      <h2>Sign in</h2>

      <form className={styles.form}>
        <Input
          className={styles.input}
          type="text"
          placeholder="Enter your email"
        />

        <Input
          className={styles.input}
          type="password"
          placeholder="Enter your password"
          title="Password must have at least 8 characters"
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
