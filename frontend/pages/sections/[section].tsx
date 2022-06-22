import React, { useMemo } from "react";
import { useRouter } from "next/router";
import SecondaryArticlePreview from "@components/SecondaryArticlePreview";
import styles from "@modules/Home.module.scss";
import { convertToArticleData } from "@utils/helpers";
import ArticlePreview from "@components/ArticlePreview";
import { GetStaticPaths, GetStaticProps } from "next";
import { API_URL, externalURL, routes } from "@utils/constants";
import axios from "axios";
import useSWR from "swr";

const Section = (props) => {
  const router = useRouter();
  const internal = useSWR(`/articles?section=${router.query.section}`, {
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
    <div className={styles.section}>
      <SecondaryArticlePreview
        alignCenter
        data={externalArticles[0]}
        hideSection
      />
      <div className={styles.other}>
        <h2 className={styles.header}>
          <span>the</span> <span>latest</span>
        </h2>
        <div className={styles.container}>
          <div className={styles.list}>
            {[
              ...(internal.data?.articles ?? []),
              ...externalArticles.slice(1),
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
    </div>
  );
};

export default Section;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const url = `${externalURL}&categories=${ctx.params?.section}`;
  const externalPromise = axios.get(url);
  const internalPromise = axios.get(
    `${API_URL}/articles?section=${ctx.params?.section}`
  );
  const [external, internal] = await Promise.all([
    externalPromise,
    internalPromise,
  ]);
  return {
    props: {
      external: external.data,
      internal: internal.data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: routes.slice(1).map((route) => {
      return {
        params: {
          section: route,
        },
      };
    }),
    fallback: false,
  };
};
