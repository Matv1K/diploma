"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import styles from "./page.module.scss";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Button, Input } from "@/components";

import { loginUser } from "@/services/users/userService";

import { InputTypes, SignInDataI } from "@/types";

const SignIn: React.FC = () => {
  const [inputData, setInputData] = useState<SignInDataI>({
    email: "",
    password: "",
  });

  const { push } = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: SignInDataI) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser({ email: inputData.email, password: inputData.password });

      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Sign in</h2>

      <form className={styles.form} onSubmit={handleSignIn}>
        <Input
          className={styles.input}
          type={InputTypes.EMAIL}
          placeholder="Enter your email"
          onChange={handleInputChange}
          name="email"
        />

        <Input
          className={styles.input}
          type={InputTypes.PASSWORD}
          placeholder="Enter your password"
          title="Password must have at least 8 characters"
          onChange={handleInputChange}
          name="password"
        />

        <div className={styles.formInfo}>
          <Button>Sign in</Button>

          <span>
            Don't have an account?
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
