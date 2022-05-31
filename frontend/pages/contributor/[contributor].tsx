import React from "react";
import styles from "@modules/Contributor.module.scss";
import { userData } from "@utils/data";
import {
  faBitbucket,
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import faLink from "@icons/light/faLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSiteName } from "@utils/helpers";
import ArticlePreview from "@components/ArticlePreview";

const socialIcons = {
  facebook: faFacebookF,
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  instagram: faInstagram,
  github: faGithub,
  bitbucket: faBitbucket,
  other: faLink,
};

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
            return <ArticlePreview key={i} />;
          })}
      </div>
    </div>
  );
};

export default Contributor;
