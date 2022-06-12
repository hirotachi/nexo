import React from "react";
import AuthForm, { FormConfig } from "@components/AuthForm";
import * as yup from "yup";

const values = {
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

const config: FormConfig<typeof values> = {
  email: {
    type: "email",
    label: "your email address",
    required: true,
    validation: yup.string().email(),
  },
  name: {
    type: "text",
    label: "what should we call you?",
    required: true,
    validation: yup.string().min(2).required(),
  },
  password: {
    type: "password",
    label: "password",
    required: true,
    validation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("passwordConfirm")], "Passwords must match"),
  },
  passwordConfirm: {
    type: "password",
    label: "confirm password",
    required: "Please confirm your password",
    validation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  },
};
const register = () => {
  return (
    <AuthForm
      description={`Creating a NEXO account lets us know what you're into so we can personalize the stories you see in your daily news feed.`}
      other={{
        link: "/login",
        intro: "Already have an account?",
        text: "Sign in here",
      }}
      showRequired
      title={"Create an account"}
      submit={{ text: "Create account", link: "/register" }}
      values={values}
      config={config}
    />
  );
};

export default register;
