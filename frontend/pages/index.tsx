import React from "react";
import { NextPage } from "next";
import styles from "@modules/Home.module.scss";
import ArticleMainPreview from "@components/ArticleMainPreview";
import ArticlePreview from "@components/ArticlePreview";

const arrayOf = <T,>(length: number, data: T) => {
  return Array.from({ length }, (_, i) => ({ ...data, id: i }));
};
const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <ArticleMainPreview />
        <div className={styles.more}>
          <ArticlePreview isHome />
          <ArticlePreview isHome isHomeSecondary />
        </div>
      </div>
      <button className={styles.load}>load more</button>
    </div>
  );
};

export default Home;
