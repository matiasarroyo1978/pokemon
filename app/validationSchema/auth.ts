import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please fill this field"),
  password: Yup.string()
    .min(6, "Please enter minimun 6 characters for password")
    .required("Please fill this field"),
});

export const useLoginValidation = () =>
  useForm({
    resolver: yupResolver(loginSchema),
  });

const registerSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please fill this field"),
  password: Yup.string()
    .required("Please fill this field")
    .min(6, "Please enter minimum 6 characters for password"),
  cnfPassword: Yup.string() 
    .required("Please fill this field")
    .oneOf([Yup.ref("password")], "Entered passwords do not match"),
});

export const useRegisterValidation = () =>
  useForm({
    resolver: yupResolver(registerSchema),
  });
