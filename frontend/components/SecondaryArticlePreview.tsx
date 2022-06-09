import React from "react";
import styles from "@modules/SecondaryArticlePreview.module.scss";
import Link from "next/link";
import { format } from "date-fns";

type SecondaryArticlePreviewProps = {
  data: TArticle;
};
const SecondaryArticlePreview = (props: SecondaryArticlePreviewProps) => {
  const { data } = props;
  const { author, id, preview, section, summary, title, created_at } = data;
  const link = `/articles/${id}`;
  return (
    <div className={styles.preview}>
      <Link href={link}>
        <a className={styles.img}>
          <img src={preview} alt={title} />
        </a>
      </Link>
      <div className={styles.main}>
        <Link href={`/sections/${section.id}`}>
          <a className={styles.topic}>{section.name}</a>
        </Link>
        <Link href={link}>
          <a className={styles.title}>{title}</a>
        </Link>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.author}>{author.name}</span>
        <span className={styles.date}>
          {format(new Date(created_at), "M.d.uu")}
        </span>
      </div>
    </div>
  );
};

export default SecondaryArticlePreview;
