"use client";
import React, { useState } from "react";
import InputField from "../pokemon/components/InputField";
import SubmitButton from "../pokemon/components/Button";
import Link from "next/link";
import { useLoginValidation } from "../validationSchema/auth";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useLoginValidation();

  const submitForm = async (values: LoginFormValues) => {
    try {
      // Iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Redirigir al usuario a la página de inicio
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error); // Agregar esta línea para imprimir el objeto de error completo
      let errorMessage = "Error logging in: ";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage += "Invalid email address.";
          break;
        case "auth/user-not-found":
          errorMessage += "User not found.";
          break;
        case "auth/wrong-password":
          errorMessage += "Incorrect password.";
          break;
        case "auth/invalid-credential":
          errorMessage += "Invalid credentials.";
          break;
        default:
          errorMessage +=
            "An unexpected error occurred. Please try again later.";
          break;
      }
      alert(errorMessage);
    }
  };

  const message = "Don't have an account to log in?";

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/25 via-blue-300 to-purple-400/60">
      <div className="w-1/2 rounded-md flex bg-white/20 shadow-lg justify-between flex-col">
        <div className="h-20 w-full flex justify-center items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-yellow-300/80 p-3 rounded-md">
            Welcome to SignIn
          </span>
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="h-full w-1/2 mx-auto">
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Enter your email here"
            name="email"
            label="Email"
          />
          <div className="relative mt-2">
            <InputField
              register={register}
              error={errors.password}
              type={showPassword ? "text" : "password"} // Alternar entre "text" y "password" según el estado de visualización de la contraseña
              placeholder="Enter your password here"
              name="password"
              label="Password"
            />
            {/* Agregar el botón de alternar la visibilidad de la contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 inset-y-0 right-3 flex items-center text-gray-300">
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {/* Botón de enviar */}
          <div className="mt-6 mb-4 flex justify-center">
            <SubmitButton label="Submit" onClick={handleSubmit(submitForm)} />
          </div>
        </form>
        <div className="h-20 mx-auto">
          <span className="text-sm text-gray-600 font-mono">
            {message}
            <Link href={'/register'}>
              <span className="text-blue-500 font-mono font-semibold text-md ml-2">
                Register Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
