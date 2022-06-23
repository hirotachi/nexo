import React from "react";
import Contributor from "@components/Contributor";
import { GetServerSideProps } from "next";
import { api } from "@pages/_app";

const ContributorPage = (props) => {
  // const { description, email, headline, id, name, socials, avatar } = userData;
  const { user, articles } = props;
  return <Contributor user={user} articles={articles} />;
};

export default ContributorPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await api.get(`/users/${ctx.query.contributor}`);
  const articles = await api.get(`/users/${ctx.query.contributor}/articles`);
  return {
    props: {
      user: user.data,
      articles: articles.data,
    },
  };
};
