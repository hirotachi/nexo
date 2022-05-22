import React from "react";
import { NextPage } from "next";
import { articlePreview } from "@components/ArticlePreview";
import styles from "@modules/Home.module.scss";
import Section from "@components/Section";

const arrayOf = <T,>(length: number, data: T) => {
  return Array.from({ length }, (_, i) => ({ ...data, id: i }));
};
const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.list}>
        <Section articles={arrayOf(2, articlePreview)} />
        <Section title={"tech"} articles={arrayOf(5, articlePreview)} />
        <Section title={"world news"} articles={arrayOf(2, articlePreview)} />
      </div>
      <button className={styles.load}>load more</button>
    </div>
  );
};

export default Home;
