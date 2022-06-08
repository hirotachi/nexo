import React from "react";
import styles from "@modules/ArticlePreview.module.scss";
import Link from "next/link";
import { format } from "date-fns";
import clsx from "clsx";

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
  const { author, created_at, id, section, preview, summary, title } = data;
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
        {showSummary && <p className={styles.summary}>{summary}</p>}
        <p className={styles.author}>{author.name}</p>
        <p className={styles.date}>{format(new Date(created_at), "M.d.uu")}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
