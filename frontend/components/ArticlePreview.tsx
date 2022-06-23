import React from "react";
import styles from "@modules/ArticlePreview.module.scss";
import Link from "next/link";
import { format } from "date-fns";
import clsx from "clsx";
import { defaultImage } from "@utils/constants";

type ArticlePreviewProps = {
  showSummary?: boolean;
  isHome?: boolean;
  isHomeSecondary?: boolean;
  theme?: "light" | "dark";
  data: TArticle;
  align?: "horizontal" | "vertical";
};
const ArticlePreview = (props: ArticlePreviewProps) => {
  const {
    showSummary,
    isHome,
    isHomeSecondary,
    theme = "light",
    data,
    align = "vertical",
  } = props;
  const { author, createdAt, id, section, preview, summary, title, source } =
    data;
  const link = source?.url ?? `/articles/${id}`;
  const linkProps = {
    target: source ? "__blank" : "",
    rel: source ? " noreferrer noopener" : "",
  };

  return (
    <div
      className={clsx(
        styles.preview,
        isHome && styles.home,
        isHomeSecondary && styles.homeSecondary,
        theme && styles[theme],
        align && styles[align]
      )}
    >
      <Link href={link}>
        <a
          className={styles.img}
          target={source ? "__blank" : ""}
          rel={source ? " noreferrer noopener" : ""}
        >
          <img src={preview ?? defaultImage} alt={title} />
        </a>
      </Link>
      <div className={styles.main}>
        <Link href={`/sections/${section.name}`}>
          <a className={styles.section}>{section.name}</a>
        </Link>
        <Link href={link}>
          <a className={styles.title} {...linkProps}>
            {title}
          </a>
        </Link>
        {showSummary && <p className={styles.summary}>{summary}</p>}
        <p className={styles.author}>{author.name}</p>
        <p className={styles.date}>{format(new Date(createdAt), "M.d.uu")}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
