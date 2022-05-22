import React from "react";
import styles from "@modules/Section.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import clsx from "clsx";

type SectionProps = {
  title?: string;
  articles: TArticlePreview[];
};
const Section = (props: SectionProps) => {
  const { articles, title } = props;
  return (
    <div className={styles.section}>
      {title && (
        <div className={styles.title}>
          <div className={styles.track}>
            {Array.from<string>({ length: 30 })
              .fill(title)
              .map((t, i) => (
                <span key={i}>#{t}</span>
              ))}
          </div>
        </div>
      )}
      <div className={clsx(styles.list, styles[`list-${articles.length}`])}>
        {articles.map((item, index) => {
          return (
            <ArticlePreview
              key={item.id}
              article={item}
              secondary={
                articles.length === 3 || (articles.length === 5 && !!index)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Section;
