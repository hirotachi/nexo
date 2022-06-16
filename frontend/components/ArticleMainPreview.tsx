import React from "react";
import styles from "@modules/ArticleMainPreview.module.scss";
import { articleData } from "@utils/data";
import Link from "next/link";

const ArticleMainPreview = () => {
  const {
    author,
    content,
    created_at,
    id,
    preview,
    section,
    summary,
    topics,
    title,
  } = articleData;
  const link = `/articles/${id}`;
  return (
    <div className={styles.preview}>
      <Link href={link}>
        <a className={styles.img}>
          <img src={preview} alt={title} />
        </a>
      </Link>
      <div className={styles.content}>
        <div className={styles.main}>
          <Link href={`/${section.name}`}>
            <a className={styles.section}>{section.name}</a>
          </Link>
          <Link href={link}>
            <a className={styles.title}>{title}</a>
          </Link>
          <span className={styles.author}>{author.name}</span>
        </div>
        <div className={styles.summary}>{summary}</div>
      </div>
    </div>
  );
};

export default ArticleMainPreview;
