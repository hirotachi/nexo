import React from "react";
import styles from "@modules/MoreLike.module.scss";
import { format } from "date-fns";

type MoreLikeProps = {
  list: TArticle[];
};
const MoreLike = (props: MoreLikeProps) => {
  const { list } = props;
  return (
    <div className={styles.more}>
      <h2 className={styles.heading}>more like this</h2>
      <div className={styles.list}>
        {list.map((article) => {
          return (
            <div className={styles.preview}>
              <div className={styles.main}>
                <div className={styles.info}>
                  <p className={styles.title}>{article.title}</p>
                  <p className={styles.author}>{article.author.name}</p>
                  <p className={styles.date}>
                    {format(new Date(article.created_at), "MM.d.uu")}
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
