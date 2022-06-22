import React from "react";
import ArticleForm, { ArticleFormInput } from "@components/ArticleForm";
import useAuthGuard from "@hooks/useAuthGuard";

const Create = () => {
  useAuthGuard(["admin", "contributor"]);
  const handleSubmit = (data: ArticleFormInput) => {
    console.log(data);
  };
  return <ArticleForm onSubmit={handleSubmit} />;
};

export default Create;
