import React, { KeyboardEventHandler, useEffect, useState } from "react";
import styles from "@modules/Search.module.scss";
import ArticlePreview from "@components/ArticlePreview";
import useInput from "@hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSearch from "@icons/solid/faSearch";
import clsx from "clsx";
import { useRouter } from "next/router";
import { api } from "@pages/_app";
import { externalURL } from "@utils/constants";
import axios from "axios";
import { convertToArticleData } from "@utils/helpers";

const Search = () => {
  // const data = arrayOf(6, articleData);
  const [external, setExternal] = useState([]);
  const [internal, setInternal] = useState([]);

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
  };
  useEffect(() => {
    if (!submitted) return;
    api
      .get(`/articles?query=${submitted}`)
      .then(({ data }) => {
        setInternal(data.articles);
      })
      .catch(() => {});
    axios
      .get(`${externalURL}&keywords=${submitted}`)
      .then(({ data }) => {
        setExternal(data.data.map(convertToArticleData));
      })
      .catch(() => {});
  }, [submitted]);
  const data = {
    internal,
    external,
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
      {!!data[currentSection].length && (
        <>
          <div className={styles.list}>
            {data[currentSection]?.map((d) => {
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
