import React from "react";
import ArticleForm, { ArticleFormInput } from "@components/ArticleForm";

const create = () => {
  const handleSubmit = (data: ArticleFormInput) => {
    console.log(data);
  };
  return <ArticleForm onSubmit={handleSubmit} />;
};

export default create;
