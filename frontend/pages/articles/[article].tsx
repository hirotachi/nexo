import React from "react";
import styles from "@modules/Article.module.scss";
import { articleData } from "@utils/data";
import Link from "next/link";
import { format } from "date-fns";

const Article = () => {
  const {
    author,
    content,
    created_at,
    id,
    preview,
    section,
    summary,
    tags,
    title,
  } = articleData;
  return (
    <div className={styles.article}>
      <div className={styles.intro}>
        <Link href={`/sections/${section.id}`}>
          <a className={styles.section}>{section.name}</a>
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.author}>
          <div className={styles.avatar}>
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} />
            ) : (
              author.name
                .split(" ")
                .map((v) => v[0])
                .join("")
            )}
          </div>
          <p className={styles.name}>
            By{" "}
            <Link href={`/contributors/${author.id}`}>
              <a className={styles.link}>{author.name}</a>
            </Link>
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.info}>
            <span className={styles.date}>
              {format(new Date(created_at), "LLLL d, yyyy H:mmaaa")}
            </span>
            <div className={styles.socials}>socials</div>
          </div>
          <div className={styles.preview}>
            <img src={preview} alt={title} />
          </div>
        </div>
        <div>tags</div>
        <div>more like this</div>
      </div>
    </div>
  );
};

export default Article;
