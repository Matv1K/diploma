"use client";

import React from "react";

import styles from "./page.module.scss";

import { Input, Button } from "@/components";

import Link from "next/link";

const SignUp: React.FC = () => {
  const handleSignUp = () => {
    console.log("sign up");
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
    </main>
  );
};

export default SignUp;
