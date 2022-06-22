import React from "react";
import ArticleForm, { ArticleFormInput } from "@components/ArticleForm";
import { articleData } from "@utils/data";

const Edit = () => {
  const handleSubmit = (data: ArticleFormInput) => {
    console.log(data);
  };
  return (
    <ArticleForm
      onSubmit={handleSubmit}
      values={{
        ...articleData,
        topics: articleData.topics.map((v) => v.name),
        section: articleData.section.name,
      }}
    />
  );
};

export default Edit;
