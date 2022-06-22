import React, { FormEventHandler } from "react";
import styles from "@modules/Footer.module.scss";
import {
  faFacebook,
  faSnapchatGhost,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socials = [
  {
    url: "https://www.facebook.com/",
    icon: faFacebook,
  },
  {
    url: "https://www.snapchat.com/",
    icon: faSnapchatGhost,
  },
  {
    url: "https://www.twitter.com/",
    icon: faTwitter,
  },
];
const Footer = () => {
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div className={styles.footer}>
      <div className={styles.intro}>
        <p className={styles.text}>
          Global reporting on everything that matters in your inbox.
        </p>
        {/*<form onSubmit={onSubmit} className={styles.form}>*/}
        {/*  <input type="email" placeholder={"your email address"} />*/}
        {/*  <button className={styles.btn}>subscribe</button>*/}
        {/*</form>*/}
      </div>
      {/*<p className={styles.disclaimer}>*/}
      {/*  By signing up to the newsletter you agree to our receive electronic*/}
      {/*  communications from NEXO that may sometimes include advertisements or*/}
      {/*  sponsored content.*/}
      {/*</p>*/}
      <div className={styles.more}>
        <div className={styles.socials}>
          {socials.map((social, index) => {
            return (
              <a
                href={social.url}
                key={index}
                target={"__blank"}
                rel={"noopener noreferrer"}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            );
          })}
        </div>
        <p className={styles.copyright}>© 2020 NEXO Services</p>
      </div>
    </div>
  );
};

export default Footer;
