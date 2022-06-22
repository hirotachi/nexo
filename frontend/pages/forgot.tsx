import React from "react";
import AuthForm, { FormConfig } from "@components/AuthForm";
import * as yup from "yup";

const values = {
  email: "",
};

const config: FormConfig<typeof values> = {
  email: {
    type: "email",
    label: "your email address",
    required: true,
    validation: yup.string().required().email(),
  },
};

const forgot = () => {
  return (
    <AuthForm
      title={"Forgot password"}
      description={"Enter your email address to receive a password reset link."}
      submit={{ text: "Reset Password", link: "/forgot" }}
      values={values}
      config={config}
    />
  );
};

export default forgot;
