import React from "react";
import AuthForm, { FormConfig } from "@components/AuthForm";
import * as yup from "yup";

const values = {
  email: "",
  password: "",
};
const config: FormConfig<typeof values> = {
  email: {
    type: "email",
    label: "your email address",
    required: true,
    validation: yup.string().email().required(),
  },
  password: {
    type: "password",
    label: "your password",
    required: true,
    validation: yup.string().min(8).required(),
    sub: {
      text: "Forgot your password?",
      link: "/forgot",
    },
  },
};
const Login = () => {
  return (
    <AuthForm
      title={"Sign In"}
      description={
        "Creating a NEXO account lets us know what you're into so we can personalize the stories you see in your daily newsletter, apps, and elsewhere."
      }
      other={{
        link: "/register",
        intro: "Don't have an account?",
        text: "Create an account",
      }}
      submit={{ text: "Sign in", link: "/login" }}
      values={values}
      config={config}
    />
  );
};

export default Login;
