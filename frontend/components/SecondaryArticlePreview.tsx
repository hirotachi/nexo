import React from "react";
import styles from "@modules/SecondaryArticlePreview.module.scss";
import Link from "next/link";
import { format } from "date-fns";
import clsx from "clsx";

type SecondaryArticlePreviewProps = {
  data: TArticle;
  hideSection?: boolean;
  alignCenter?: boolean;
};
const SecondaryArticlePreview = (props: SecondaryArticlePreviewProps) => {
  const { data, hideSection, alignCenter } = props;
  const { author, id, preview, section, summary, title, created_at, source } =
    data;
  const link = source?.url ?? `/articles/${id}`;
  return (
    <div className={clsx(styles.preview, alignCenter && styles.alignCenter)}>
      <Link href={link}>
        <a
          className={styles.img}
          target={source ? "__blank" : ""}
          rel={source ? " noreferrer noopener" : ""}
        >
          <img src={preview} alt={title} />
        </a>
      </Link>
      <div className={styles.main}>
        {!hideSection && (
          <Link href={`/sections/${section.id}`}>
            <a className={styles.topic}>{section.name}</a>
          </Link>
        )}
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
