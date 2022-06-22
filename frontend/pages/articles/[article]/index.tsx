import React, { Fragment } from "react";
import styles from "@modules/Article.module.scss";
import { articleData } from "@utils/data";
import Link from "next/link";
import { format } from "date-fns";
import MoreLike from "@components/MoreLike";
import { arrayOf } from "@utils/helpers";

const Article = () => {
  const {
    author,
    content,
    createdAt,
    id,
    preview,
    section,
    summary,
    topics,
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
              {format(new Date(createdAt), "LLLL d, yyyy H:mmaaa")}
            </span>
            <div className={styles.socials}>socials</div>
          </div>
          <div className={styles.preview}>
            <img src={preview} alt={title} />
          </div>
          <div>html content</div>
          <div className={styles.tags}>
            <span className={styles.name}>tagged:</span>
            {topics.map((topic, i) => (
              <Fragment key={topic.id}>
                {i ? ", " : ""}
                <Link href={`/topic/${topic.id}`}>
                  <a className={styles.tag}>{topic.name}</a>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <MoreLike list={arrayOf(5, articleData)} />
      </div>
    </div>
  );
};

export default Article;
