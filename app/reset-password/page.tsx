"use client";

import React from "react";

import styles from "./page.module.scss";

import { Input, Button } from "@/components";

import { InputTypes } from "@/types";

const ResetPassword = () => {
  const handleChangePassword = () => {
    console.log("password has been changed");
  };

  return (
    <main>
      <h2>Reset Password</h2>

      <form className={styles.form}>
        <Input
          className={styles.input}
          type={InputTypes.PASSWORD}
          placeholder="Enter new password"
        />

        <Input
          className={styles.input}
          type={InputTypes.PASSWORD}
          placeholder="Confirm new password"
        />

        <div>
          <Button onClick={handleChangePassword}>Change password</Button>
        </div>
      </form>
    </main>
  );
};

export default ResetPassword;
