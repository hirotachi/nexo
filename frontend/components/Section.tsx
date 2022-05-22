import React from "react";
import styles from "@modules/Section.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import clsx from "clsx";

type SectionProps = {
  title?: "";
  articles: TArticlePreview[];
};
const Section = (props: SectionProps) => {
  const { articles, title } = props;
  return (
    <div className={styles.section}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={clsx(styles.list, styles[`list-${articles.length}`])}>
        {articles.map((item) => {
          return (
            <ArticlePreview
              key={item.id}
              article={item}
              secondary={articles.length > 2}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Section;
