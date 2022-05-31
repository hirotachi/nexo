import React from "react";
import styles from "@modules/ArticlePreview.module.scss";
import Link from "next/link";
import { articleData } from "@utils/data";
import { format } from "date-fns";

const ArticlePreview = () => {
  const { author, created_at, id, section, preview, summary, title } =
    articleData;
  return (
    <div className={styles.preview}>
      <Link href={`/articles/${id}`}>
        <a className={styles.img}>
          <img src={preview} alt={title} />
        </a>
      </Link>
      <div className={styles.main}>
        <Link href={`/section/${section.id}`}>
          <a className={styles.section}>{section.name}</a>
        </Link>
        <Link href={`/articles/${id}`}>
          <a className={styles.title}>{title}</a>
        </Link>
        <p className={styles.summary}>{summary}</p>
        <p className={styles.author}>{author.name}</p>
        <p className={styles.date}>{format(new Date(created_at), "M.d.uu")}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
