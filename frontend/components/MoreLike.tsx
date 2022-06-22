import React from "react";
import styles from "@modules/MoreLike.module.scss";
import { format } from "date-fns";
import Link from "next/link";

type MoreLikeProps = {
  list: TArticle[];
};
const MoreLike = (props: MoreLikeProps) => {
  const { list } = props;
  return (
    <div className={styles.more}>
      <h2 className={styles.heading}>
        <span>more</span> like this
      </h2>
      <div className={styles.list}>
        {list.map((article) => {
          return (
            <div className={styles.preview}>
              <div className={styles.main}>
                <Link href={`/topic/${article.section.name}`}>
                  <a className={styles.section}>{article.section.name}</a>
                </Link>
                <div className={styles.info}>
                  <Link href={`/articles/${article.id}`}>
                    <a className={styles.title}>{article.title}</a>
                  </Link>
                  <p className={styles.author}>{article.author.name}</p>
                  <p className={styles.date}>
                    {format(new Date(article.createdAt), "MM.d.uu")}
                  </p>
                </div>
              </div>
              <div className={styles.img}>
                <img src={article.preview} alt={article.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreLike;
