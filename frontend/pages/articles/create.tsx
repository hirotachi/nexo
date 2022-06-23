import React from "react";
import ArticleForm, { ArticleFormInput } from "@components/ArticleForm";
import useAuthGuard from "@hooks/useAuthGuard";
import { api } from "@pages/_app";
import { useRouter } from "next/router";

const Create = () => {
  useAuthGuard(["admin", "contributor"]);
  const router = useRouter();
  const handleSubmit = (data: ArticleFormInput) => {
    api.post(`/articles`, data).then(({ data }) => {
      router.push(`/articles/${data.article.id}`);
    });
  };
  return <ArticleForm onSubmit={handleSubmit} />;
};

export default Create;
