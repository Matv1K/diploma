"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import styles from "./page.module.scss";

import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { Input, Button } from "@/components";

import { registerUser } from "@/services/users/userService";

import { ButtonOptions, InputTypes, SignUpDataI } from "@/types";

const SignUp: React.FC = () => {
  const [inputData, setInputData] = useState<SignUpDataI>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { push } = useRouter();

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await registerUser({
        name: inputData.name,
        lastName: inputData.lastName,
        password: inputData.password,
        email: inputData.email,
      });

      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("google");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputData((prev: SignUpDataI) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <main>
      <h2>Sign up</h2>

      <form className={styles.form}>
        <Input
          className={styles.input}
          type={InputTypes.TEXT}
          placeholder="Enter your name"
          onChange={handleInputChange}
          name="name"
          required
        />

        <Input
          className={styles.input}
          type={InputTypes.TEXT}
          placeholder="Enter your last name"
          onChange={handleInputChange}
          name="lastName"
          required
        />

        <Input
          className={styles.input}
          type={InputTypes.EMAIL}
          placeholder="Enter your email"
          onChange={handleInputChange}
          name="email"
          required
          autoComplete="off"
        />

        <Input
          className={styles.input}
          type={InputTypes.PASSWORD}
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
            <Button option={ButtonOptions.GOOGLE} onClick={handleGoogleSignUp}>
              Sign up with Google
            </Button>
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
