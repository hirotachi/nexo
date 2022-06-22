import React from "react";
import { GetStaticProps, NextPage } from "next";
import styles from "@modules/Home.module.scss";
import ArticleMainPreview from "@components/ArticleMainPreview";
import ArticlePreview from "@components/ArticlePreview";
import { arrayOf } from "@utils/helpers";
import { articleData } from "@utils/data";
import SecondaryArticlePreview from "@components/SecondaryArticlePreview";
import axios from "axios";
import { MEDIA_STACK_API_KEY, NEWS_LANGUAGE, pageSize } from "@utils/constants";

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
      <SecondaryArticlePreview data={articleData} />
      <button className={styles.load}>load more</button>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const test = await axios.get(
    `http://api.mediastack.com/v1/news?access_key=${MEDIA_STACK_API_KEY}&languages=${NEWS_LANGUAGE}&limit=${pageSize}`
  );
  console.log(test.data);
  return {
    props: {},
    revalidate: 10,
  };
};
