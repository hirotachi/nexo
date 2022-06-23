import React from "react";
import ArticleForm, { ArticleFormInput } from "@components/ArticleForm";
import { api } from "@pages/_app";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const Edit = (props) => {
  const {
    article: { author, section, ...article },
  } = props;
  const router = useRouter();
  const handleSubmit = (data: ArticleFormInput) => {
    const articleId = router.query.article;
    api.put(`/articles/${articleId}`, data).then(({ data }) => {
      router.push(`/articles/${articleId}`);
    });
  };
  return (
    <ArticleForm
      onSubmit={handleSubmit}
      values={{
        ...article,
        topics: article.topics.map((v) => v.name),
        sectionId: section.id,
      }}
    />
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { article } = ctx.query;
  const res = await api.get(`/articles/${article}`);
  return {
    props: {
      article: res.data,
    },
  };
};
