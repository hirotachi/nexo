import React from "react";
import styles from "@modules/Article.module.scss";
import { articleData } from "@utils/data";
import { format } from "date-fns";

const Article = () => {
  const { excerpt, media, published_date, summary, title } = articleData;
  return (
    <div className={styles.article}>
      <div className={styles.poster}>
        <img src={media} alt={title} />
      </div>
      <div className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.publish}>
            {format(new Date(published_date), "MMM dd, yyyy, h:m aaa")}
          </p>
          <div className={styles.socials}>socials</div>
        </div>
        <div
          className={styles.summary}
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        <a href="#" className={styles.link}>
          read more
        </a>
      </div>
    </div>
  );
};

export default Article;
