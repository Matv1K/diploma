"use client";

import React from "react";

import styles from "./page.module.scss";

import { Input, Button } from "@/components";

import Link from "next/link";

const SignIn: React.FC = () => {
  const handleSignIn = () => {
    console.log("sign in");
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
    </main>
  );
};

export default SignIn;
