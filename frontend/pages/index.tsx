import React from "react";
import { NextPage } from "next";
import styles from "@modules/Home.module.scss";
import ArticleMainPreview from "@components/ArticleMainPreview";
import ArticlePreview from "@components/ArticlePreview";
import { arrayOf } from "@utils/helpers";
import { articleData } from "@utils/data";

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <ArticleMainPreview />
        <div className={styles.more}>
          {arrayOf(2, articleData).map((data, i) => {
            return (
              <ArticlePreview
                data={data}
                key={data.id}
                isHome
                isHomeSecondary={!!i}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.list}>
        {arrayOf(3, articleData).map((d) => {
          return <ArticlePreview key={d.id} data={d} isHome />;
        })}
      </div>
      <div className={styles.other}>
        <h2 className={styles.header}>
          <span>the</span> <span>latest</span>
        </h2>
        <div className={styles.container}>
          <div className={styles.list}>
            {arrayOf(6, articleData).map((d) => {
              return (
                <ArticlePreview
                  key={d.id}
                  align={"horizontal"}
                  data={d}
                  isHome
                />
              );
            })}
          </div>
        </div>
      </div>
      <button className={styles.load}>load more</button>
    </div>
  );
};

export default Home;
