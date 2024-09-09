"use client";

import React from "react";

import styles from "./page.module.scss";

import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";

import { Input, Button } from "@/components";

import { TOAST_MESSAGES } from "@/constants";

const notify = () => toast.success(TOAST_MESSAGES.SIGN_UP);

const SignUp: React.FC = () => {
  const handleSignUp = (e: any) => {
    e.preventDefault();

    notify();
  };

  return (
    <main>
      <h2>Sign up</h2>

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

        <Input
          className={styles.input}
          type="password"
          placeholder="Confirm your password"
          title="Password must have at least 8 characters"
        />

        <div className={styles.formInfo}>
          <Button onClick={handleSignUp}>Sign up</Button>

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
