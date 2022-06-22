import React, { useMemo } from "react";
import { GetStaticProps } from "next";
import styles from "@modules/Home.module.scss";
import ArticleMainPreview from "@components/ArticleMainPreview";
import ArticlePreview from "@components/ArticlePreview";
import SecondaryArticlePreview from "@components/SecondaryArticlePreview";
import axios from "axios";
import {
  API_URL,
  MEDIA_STACK_API_KEY,
  NEWS_LANGUAGE,
  pageSize,
} from "@utils/constants";
import useSWR from "swr";
import { convertToArticleData } from "@utils/helpers";

const externalURL = `http://api.mediastack.com/v1/news?access_key=${MEDIA_STACK_API_KEY}&languages=${NEWS_LANGUAGE}&limit=${pageSize}`;

const Home = (props) => {
  const internal = useSWR<TArticle[]>("/articles", {
    fallback: {
      "/articles": props.internal,
    },
  });
  const external = useSWR<{ data: TExternalArticle[] }>(externalURL, {
    fallback: {
      [externalURL]: props.external,
    },
  });
  const externalArticles = useMemo<Partial<TArticle>[]>(() => {
    const externalData = external.data?.data;
    if (!externalData) return [];
    return externalData.map(convertToArticleData);
  }, [external.data.data]);
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <ArticleMainPreview data={externalArticles[0]} />
        <div className={styles.more}>
          {externalArticles.slice(1, 3).map((data, i) => {
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
        {externalArticles.slice(3, 6).map((d) => {
          return <ArticlePreview key={d.id} data={d} isHome />;
        })}
      </div>
      <div className={styles.other}>
        <h2 className={styles.header}>
          <span>the</span> <span>latest</span>
        </h2>
        <div className={styles.container}>
          <div className={styles.list}>
            {[
              ...internal.data?.articles?.slice(0, 4),
              ...externalArticles.slice(5, 9),
            ].map((d) => {
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
      <SecondaryArticlePreview data={externalArticles[9]} />
      <button className={styles.load}>load more</button>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const externalPromise = axios.get(externalURL);
  const url = `${API_URL}/articles`;
  const [external, internal] = await Promise.all([
    externalPromise,
    fetch(url).then((res) => res.json()),
  ]);
  return {
    props: {
      external: external.data,
      internal: internal,
    },
    revalidate: 10,
  };
};
