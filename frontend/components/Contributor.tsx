import styles from "@modules/Contributor.module.scss";
import { socialIcons } from "@utils/constants";
import { getSiteName } from "@utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticlePreview from "@components/ArticlePreview";
import React from "react";
import faUser from "@icons/solid/faUser";

type ContributorProps = {
  user: TUser;
  articles: TArticle[];
};
const Contributor = (props: ContributorProps) => {
  const { user, articles = [] } = props;
  const { description, email, headline, id, name, socials, avatar } = user;
  let socialsParsed = socials ? JSON.parse(socials) : [];
  return (
    <div className={styles.contributor}>
      <div className={styles.intro}>
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.headline}>{headline}</p>
        <a href={`emailTo:${email}`} className={styles.email}>
          {email}
        </a>
        <p className={styles.description}>{description}</p>
        <div className={styles.socials}>
          {socialsParsed.map((social) => {
            const socialIcon = socialIcons[getSiteName(social) || "other"];
            return (
              <a
                className={styles.social}
                href={social}
                key={social}
                target={"__blank"}
                rel={"noreferrer nofollow"}
              >
                <FontAwesomeIcon icon={socialIcon} />
              </a>
            );
          })}
        </div>
      </div>
      <div className={styles.list}>
        {articles.map((v, i) => {
          return <ArticlePreview key={i} data={v} />;
        })}
      </div>
    </div>
  );
};

export default Contributor;
