import React from "react";
import styles from "@modules/SecondaryArticlePreview.module.scss";
import Link from "next/link";
import { format } from "date-fns";
import clsx from "clsx";
import { defaultImage } from "@utils/constants";

type SecondaryArticlePreviewProps = {
  data: TArticle;
  hideSection?: boolean;
  alignCenter?: boolean;
};
const SecondaryArticlePreview = (props: SecondaryArticlePreviewProps) => {
  const { data, hideSection, alignCenter } = props;
  const { author, id, preview, section, summary, title, createdAt, source } =
    data;
  const link = source?.url ?? `/articles/${id}`;
  const linkProps = {
    target: source ? "__blank" : "",
    rel: source ? " noreferrer noopener" : "",
  };
  return (
    <div className={clsx(styles.preview, alignCenter && styles.alignCenter)}>
      <Link href={link}>
        <a className={styles.img} {...linkProps}>
          <img src={preview ?? defaultImage} alt={title} />
        </a>
      </Link>
      <div className={styles.main}>
        {!hideSection && (
          <Link href={`/sections/${section.id}`}>
            <a className={styles.topic}>{section.name}</a>
          </Link>
        )}
        <Link href={link}>
          <a className={styles.title} {...linkProps}>
            {title}
          </a>
        </Link>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.author}>{author.name}</span>
        <span className={styles.date}>
          {format(new Date(createdAt), "M.d.uu")}
        </span>
      </div>
    </div>
  );
};

export default SecondaryArticlePreview;
