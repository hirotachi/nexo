import React, { KeyboardEventHandler, useState } from "react";
import styles from "@modules/Search.module.scss";
import { arrayOf } from "@utils/helpers";
import { articleData } from "@utils/data";
import ArticlePreview from "@components/ArticlePreview";
import useInput from "@hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSearch from "@icons/solid/faSearch";
import clsx from "clsx";
import { useRouter } from "next/router";

const Search = () => {
  const data = arrayOf(6, articleData);
  const [submitted, setSubmitted] = useState("");
  const [currentSection, setCurrentSection] = useState<"internal" | "external">(
    "internal"
  );
  const router = useRouter();
  const search = useInput(router.query.q ?? "");
  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.code !== "Enter" || !search.value) {
      return;
    }
    setSubmitted(search.value);
    console.log("submit");
  };
  return (
    <div className={styles.search}>
      <div
        className={clsx(styles.input, search.focused && styles.inputFocused)}
      >
        <input
          type="text"
          {...search.props}
          placeholder={"enter text and press Enter"}
          onKeyUp={handleKeyUp}
        />
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      {submitted && (
        <div className={styles.nav}>
          {["external", "internal"].map((section) => {
            return (
              <span
                onClick={() => setCurrentSection(section)}
                className={clsx(
                  styles.section,
                  section === currentSection && styles.sectionActive
                )}
                key={section}
              >
                {section}
              </span>
            );
          })}
        </div>
      )}
      {data.length && (
        <>
          <div className={styles.list}>
            {data.map((d) => {
              return <ArticlePreview key={d.id} data={d} isHome />;
            })}
          </div>
          {/*<button className={styles.load}>load more</button>*/}
        </>
      )}
    </div>
  );
};

export default Search;
