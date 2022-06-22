import React, { useState } from "react";
import styles from "@modules/MobileNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@icons/regular/faBars";
import faTimes from "@icons/light/faTimes";
import Link from "next/link";
import faSearch from "@icons/regular/faSearch";
import { routes, socialIcons, socials } from "@utils/constants";
import { getSiteName } from "@utils/helpers";
import useClickOutside from "@hooks/useClickOutside";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  let toggleMenu = () => setIsOpen((v) => !v);
  const menuRef = useClickOutside(() => isOpen && setIsOpen(false));
  return (
    <div className={styles.nav} ref={menuRef}>
      <span className={styles.btn} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </span>
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.links}>
            {routes.map((route, i) => {
              return (
                <Link href={!i ? "/" : `/sections/${route}`} key={route}>
                  <a className={styles.link} onClick={toggleMenu}>
                    {route}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className={styles.search}>
            <input type="text" placeholder={"search articles"} />
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <div className={styles.socials}>
            {socials.map((social) => {
              const siteName = getSiteName(social);
              const icon = socialIcons[siteName] ?? socialIcons.other;
              return (
                <a href={social} className={styles.social} key={social}>
                  <FontAwesomeIcon icon={icon} />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
