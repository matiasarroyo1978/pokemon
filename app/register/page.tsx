"use client";
import React from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/Button";
import Link from "next/link";
import { LOGIN_ROUTE } from "../constants/route";
import { registerValidation } from "../validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = registerValidation();
  const submitForm = (values: any) => {
    console.log("register form values ", values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        alert("User registration successful.");
        reset();
        router.push(LOGIN_ROUTE);
      })
      .catch((err) => {
        console.log("catch", err.message);
        if (err.code === "auth/email-already-in-use") {
          alert(
            "User already registered. Please log in or use a different email."
          );
        } else {
          alert("User registration failed. Please try again...");
        }
      });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/25 via-blue-300 to-purple-400/60">
      <div className="w-1/2 rounded-md flex bg-white/20 shadow-lg justify-between flex-col">
        <div className="h-20 w-full flex justify-center items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-yellow-300/80 p-3 rounded-md">
            Welcome to Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="h-full w-1/2 mx-auto"
        >
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Enter your email here"
            name="email"
            label="Email"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Enter your password here"
            name="password"
            label="Password"
          />
          <InputField
            register={register}
            error={errors.cnfPassword}
            type="password"
            placeholder="Enter your confirm password here"
            name="cnfPassword"
            label="Confirm Password"
          />
          <SubmitButton label="Submit" />
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600 font-mono">
            Already have an account?
            <Link href={LOGIN_ROUTE}>
              <span className="text-blue-500 font-mono font-semibold text-md ml-2">
                Login Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
