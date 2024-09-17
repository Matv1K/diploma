"use client";

import React, { useState } from "react";

import styles from "./page.module.scss";

import Link from "next/link";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [address, setAddress] = useState("123 Main St, Springfield, IL");
  const [paymentMethod, setPaymentMethod] = useState("Visa ending in 1234");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main>
      <h2>My Profile</h2>

      <div className={styles.profileDetails}>
        <div className={styles.field}>
          <div className={styles.info}>
            {firstName} {lastName}
          </div>
        </div>

        <div className={styles.field}>
          <span>Address:</span>
          <div className={styles.info}>{address}</div>
        </div>

        <div className={styles.field}>
          <span>Payment Method:</span>
          <div className={styles.info}>{paymentMethod}</div>
        </div>

        {isEditing && (
          <button onClick={handleEditToggle} className={styles.editButton}>
            Save
          </button>
        )}

        {!isEditing && (
          <button onClick={handleEditToggle} className={styles.editButton}>
            Edit
          </button>
        )}
      </div>

      <div className={styles.links}>
        <Link href="/reset-password">Reset Password</Link>
        <Link href="/orders">View Orders</Link>
      </div>
    </main>
  );
};

export default Profile;
