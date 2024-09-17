"use client";

import React, { useState, useEffect } from "react";

import styles from "./page.module.scss";

import Link from "next/link";
import { Input, Button, Loader } from "@/components";

import useCurrentUser from "@/hooks/useCurrentUser";

import { updateCurrentUser } from "@/services/users/userService";

import { InputTypes } from "@/types";

const Profile: React.FC = () => {
  const { user: currentUser, loading } = useCurrentUser();
  const [updatedUserData, setUpdatedUserData] = useState({
    name: currentUser?.name || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || "",
    address: {
      country: currentUser?.address?.country || "",
      city: currentUser?.address?.city || "",
      address: currentUser?.address?.address || "",
    },
  });

  console.log(updatedUserData);

  useEffect(() => {
    if (currentUser) {
      setUpdatedUserData({
        name: currentUser.name || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        address: {
          country: currentUser.address?.country || "",
          city: currentUser.address?.city || "",
          address: currentUser.address?.address || "",
        },
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["country", "city", "address"].includes(name)) {
      setUpdatedUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUpdatedUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateUser = async () => {
    await updateCurrentUser(updatedUserData);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <h2>My Profile</h2>

      <div className={styles.profileDetails}>
        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Account Information</h3>
          <Input
            className={styles.input}
            type={InputTypes.EMAIL}
            value={updatedUserData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
            name="email"
          />

          <div className={styles.change}>
            <Link href="/reset-password">Reset password</Link>
          </div>
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Personal data:</h3>

          <div className={styles.inputs}>
            <Input
              className={styles.input}
              type={InputTypes.TEXT}
              value={updatedUserData.name}
              placeholder="Enter your first name"
              name="name"
              onChange={handleInputChange}
              required
            />

            <Input
              className={styles.input}
              type={InputTypes.TEXT}
              value={updatedUserData.lastName}
              placeholder="Enter your last name"
              onChange={handleInputChange}
              name="lastName"
            />
          </div>

          <Input
            type={InputTypes.TEXT}
            className={styles.input}
            value={updatedUserData.phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleInputChange}
            name="phoneNumber"
          />
        </div>

        <div className={styles.field}>
          <h3 className={styles.headingSecondary}>Delivery address:</h3>

          <Input
            className={styles.input}
            type={InputTypes.TEXT}
            value={updatedUserData.address.country}
            placeholder="Choose your country"
            name="country"
            onChange={handleInputChange}
          />

          <Input
            className={styles.input}
            type={InputTypes.TEXT}
            placeholder="Choose your city"
            name="city"
            value={updatedUserData.address.city}
            onChange={handleInputChange}
          />

          <Input
            className={styles.input}
            type={InputTypes.TEXT}
            placeholder="Enter your address"
            name="address"
            onChange={handleInputChange}
            value={updatedUserData.address.address}
          />
        </div>

        <Button onClick={handleUpdateUser}>Save</Button>
      </div>
    </main>
  );
};

export default Profile;
