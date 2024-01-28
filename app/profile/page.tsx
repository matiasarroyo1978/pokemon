"use client";
import React from "react";
import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import SubmitButton from "../components/Button";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useForm } from "react-hook-form";
import { LOGIN_ROUTE } from "../constants/route";

const Profile = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Reauthenticate user before updating email and password
        const credential = EmailAuthProvider.credential(
          user.email,
          data.currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        // If reauthentication successful, update email and password
        await updateEmail(user, data.email);
        await updatePassword(user, data.password);
        alert("Email and password updated successfully.");
        reset();
        router.push(LOGIN_ROUTE); // Redirect to home page or wherever you want
      }
    } catch (error) {
      console.error("Error updating email and password:", error);
      if (error.code === "auth/wrong-password") {
        alert("Incorrect current password. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/25 via-blue-300 to-purple-400/60">
      <div className="w-1/2 rounded-md flex bg-white/20 shadow-lg justify-between flex-col">
        <div className="h-20 w-full flex justify-center items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-yellow-300/80 p-3 rounded-md">
            Update Email and Password
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-1/2 mx-auto"
        >
          <InputField
            register={register}
            error={errors.email}
            type="email"
            placeholder="Enter your new email here"
            name="email"
            label="Email"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Enter your new password here"
            name="password"
            label="Password"
          />
          <InputField
            register={register}
            error={errors.currentPassword}
            type="password"
            placeholder="Enter your current password here"
            name="currentPassword"
            label="Current Password"
          />
          <SubmitButton label="Update" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
