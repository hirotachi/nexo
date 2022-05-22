import React from "react";
import styles from "@modules/Nav.module.scss";
import Link from "next/link";
import Logo from "@assets/logo-h.svg";

const Nav = () => {
  const routes = [
    "home",
    "news",
    "food",
    "tech",
    "world news",
    "sports",
    "blog",
  ];
  return (
    <div className={styles.nav}>
      <div className={styles.intro}>
        <div className={styles.language}>+ English</div>
        <Link href={"/"}>
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <div className={styles.auth}>
          <Link href={"/login"}>
            <a className={styles.link}>sign in</a>
          </Link>
        </div>
      </div>
      <div className={styles.main}>
        {routes.map((route) => (
          <Link key={route} href={`/${route === "home" ? "" : route}`}>
            <a className={styles.link}>{route}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;
