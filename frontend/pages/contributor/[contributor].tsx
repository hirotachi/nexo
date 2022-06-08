import React from "react";
import styles from "@modules/Contributor.module.scss";
import { articleData, userData } from "@utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSiteName } from "@utils/helpers";
import ArticlePreview from "@components/ArticlePreview";
import { socialIcons } from "@utils/constants";

const Contributor = () => {
  const { description, email, headline, id, name, socials, avatar } = userData;
  return (
    <div className={styles.contributor}>
      <div className={styles.intro}>
        <div className={styles.avatar}>
          <img src={avatar} alt={name} />
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.headline}>{headline}</p>
        <a href={`emailTo:${email}`} className={styles.email}>
          {email}
        </a>
        <p className={styles.description}>{description}</p>
        <div className={styles.socials}>
          {socials.map((social) => {
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
        {Array(6)
          .fill("")
          .map((v, i) => {
            return <ArticlePreview key={i} data={articleData} />;
          })}
      </div>
    </div>
  );
};

export default Contributor;
