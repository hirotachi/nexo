import React from "react";
import styles from "@modules/Nav.module.scss";
import Link from "next/link";
import Logo from "../assets/logo-h.svg";
import { routes, socialIcons, socials } from "@utils/constants";
import MobileNav from "@components/MobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faUser from "@icons/solid/faUser";
import { getSiteName } from "@utils/helpers";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.sub}>
        <div className={styles.auth}>
          <Link href={"/login"}>
            <a>Sign In</a>
          </Link>
          <Link href={"/register"}>
            <a>Create an account</a>
          </Link>
        </div>
        <span className={styles.lang}>+ english</span>
      </div>
      <div className={styles.main}>
        <MobileNav />
        <Link href={"/"}>
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <div className={styles.links}>
          {routes.map((route, i) => {
            return (
              <Link href={!i ? "/" : `/${route}`} key={route}>
                <a className={styles.link}>{route}</a>
              </Link>
            );
          })}
        </div>
        <div className={styles.socials}>
          {socials.slice(0, 3).map((social) => {
            const icon = socialIcons[getSiteName(social)] ?? socialIcons.other;
            return (
              <a
                href={social}
                className={styles.social}
                key={social}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            );
          })}
        </div>
        <Link href={"/login"}>
          <a className={styles.login}>
            <FontAwesomeIcon icon={faUser} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
