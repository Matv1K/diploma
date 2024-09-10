"use client";

import React from "react";

import styles from "./page.module.scss";

import { Input, Button } from "@/components";

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
          type="password"
          placeholder="Enter new password"
        />

        <Input
          className={styles.input}
          type="password"
          placeholder="Confirm new password"
        />

        <Button onClick={handleChangePassword}>Change password</Button>
      </form>
    </main>
  );
};

export default ResetPassword;
