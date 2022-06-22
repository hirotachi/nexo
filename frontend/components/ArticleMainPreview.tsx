import React from "react";
import styles from "@modules/ArticleMainPreview.module.scss";
import Link from "next/link";
import { defaultImage } from "@utils/constants";

type ArticleMainPreviewProps = {
  data: TArticle;
};

const ArticleMainPreview = (props: ArticleMainPreviewProps) => {
  const {
    author,
    content,
    createdAt,
    id,
    preview,
    section,
    summary,
    topics,
    source,
    title,
  } = props.data;
  const link = source?.url ?? `/articles/${id}`;
  const linkProps = {
    target: source ? "__blank" : "",
    rel: source ? " noreferrer noopener" : "",
  };

  return (
    <div className={styles.preview}>
      <Link href={link}>
        <a className={styles.img} {...linkProps}>
          <img src={preview ?? defaultImage} alt={title} />
        </a>
      </Link>
      <div className={styles.content}>
        <div className={styles.main}>
          <Link href={`/${section.name}`}>
            <a className={styles.section}>{section.name}</a>
          </Link>
          <Link href={link}>
            <a className={styles.title} {...linkProps}>
              {title}
            </a>
          </Link>
          <span className={styles.author}>{author.name}</span>
        </div>
        <div className={styles.summary}>{summary}</div>
      </div>
    </div>
  );
};

export default ArticleMainPreview;
