import React from "react";
import { useRouter } from "next/router";
import SecondaryArticlePreview from "@components/SecondaryArticlePreview";
import { articleData } from "@utils/data";
import styles from "@modules/Home.module.scss";
import { arrayOf } from "@utils/helpers";
import ArticlePreview from "@components/ArticlePreview";

const Section = () => {
  const router = useRouter();
  console.log(router.query.section);
  return (
    <div className={styles.section}>
      <SecondaryArticlePreview alignCenter data={articleData} hideSection />
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
    </div>
  );
};

export default Section;
