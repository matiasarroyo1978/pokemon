"use client";
import React from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/Button";
import Link from "next/link";
import { HOME_ROUTE, REGISTER_ROUTE } from "../constants/route";
import { loginValidation } from "../validationSchema/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = loginValidation();
const submitForm = (values:object) => {
  console.log("form values ", values);
  router.push(HOME_ROUTE)
}

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/25 via-blue-300 to-purple-400/60">
      <div className="w-1/2 rounded-md flex bg-white/20 shadow-lg justify-between flex-col">
        <div className="h-20 w-full flex justify-center items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-yellow-300/80 p-3 rounded-md">
            Welcome to SignIn
          </span>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto">
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
          <SubmitButton label="Submit" />
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600 font-mono">
            Don't have an account?
            <Link href={REGISTER_ROUTE}>
              <span className="text-blue-500 font-mono font-semibold text-md ml-2">
                Register Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
