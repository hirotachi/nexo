import React from "react";
import styles from "@modules/ArticlePreview.module.scss";
import clsx from "clsx";
import Link from "next/link";

export const articlePreview: TArticlePreview = {
  title: "biden to propose new 'billionaires tax' - reports",
  image: "https://picsum.photos/200/300",
  author: "John Smith",
  source: "CNN",
  category: "politics",
  id: 0,
};

type ArticlePreviewProps = {
  className?: string;
  main?: boolean;
  secondary?: boolean;
  article: TArticlePreview;
};

const ArticlePreview = (props: ArticlePreviewProps) => {
  const { className, main, secondary, article } = props;

  const { author, category, image, source, title } = article;
  return (
    <div
      style={{
        "--bg-image": `url(${image})`,
      }}
      className={clsx(
        styles.preview,
        main && styles.main,
        secondary && styles.secondary,
        className
      )}
    >
      {/*<div className={styles.img}>*/}
      {/*  <img src={image} alt={title} />*/}
      {/*</div>*/}
      <div className={styles.info}>
        <p className={styles.title}>
          {title} - {source}
        </p>
        <div className={styles.more}>
          <Link href={`/articles/?category=${category}`}>
            <a className={styles.category}>#{category}</a>
          </Link>
          <span className={styles.author}>By {author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
