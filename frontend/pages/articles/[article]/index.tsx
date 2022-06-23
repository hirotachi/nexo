import React, { Fragment } from "react";
import styles from "@modules/Article.module.scss";
import Link from "next/link";
import { format } from "date-fns";
import MoreLike from "@components/MoreLike";
import { GetServerSideProps } from "next";
import { api } from "@pages/_app";

const Article = (props) => {
  console.log(props);
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
  } = props.article;
  return (
    <div className={styles.article}>
      <div className={styles.intro}>
        <Link href={`/sections/${section.name}`}>
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
            {/*<div className={styles.socials}>socials</div>*/}
          </div>
          <div className={styles.preview}>
            <img src={preview} alt={title} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <div className={styles.tags}>
            <span className={styles.name}>tagged:</span>
            {topics.map((topic, i) => (
              <Fragment key={topic.id}>
                {i ? ", " : ""}
                {/*<Link href={`/topic/${topic.id}`}>*/}
                <span className={styles.tag}>{topic.name}</span>
                {/*</Link>*/}
              </Fragment>
            ))}
          </div>
        </div>
        {!!props.related.length && <MoreLike list={props.related} />}
      </div>
    </div>
  );
};

export default Article;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await api.get(`/articles/${ctx.query.article}`);
  return {
    props: {
      ...res.data,
    },
  };
};
