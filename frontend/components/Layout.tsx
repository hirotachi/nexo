import React, { PropsWithChildren } from "react";
import styles from "@modules/Layout.module.scss";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

const Layout = (props: PropsWithChildren<any>) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Nav />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
