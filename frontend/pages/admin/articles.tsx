import React, { KeyboardEventHandler, useState } from "react";
import styles from "@modules/Admin.module.scss";
import { arrayOf } from "@utils/helpers";
import { articleData } from "@utils/data";
import Table, { ColumnConfig } from "@components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faInfo from "@icons/regular/faInfo";
import faPencil from "@icons/regular/faPencil";
import faTrash from "@icons/regular/faTrash";
import useInput from "@hooks/useInput";
import faSearch from "@icons/regular/faSearch";
import Pagination from "@components/Pagination";
import Link from "next/link";

const data: TArticle[] = arrayOf(10, articleData).map((v, i) => ({
  ...v,
  id: i,
}));

const AdminSection = () => {
  const columns: ColumnConfig<keyof TArticle | string>[] = [
    { name: "ID", uid: "id" },
    { name: "TITLE", uid: "title", stretch: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  const handleAction = (
    article: TArticle,
    actions: "remove" | "view" | "edit"
  ) => {
    switch (actions) {
      case "remove":
        console.log("remove article", article);
        break;
      case "view":
        console.log("view article", article);
        break;
      case "edit":
        console.log("edit article", article);
        break;
    }
  };
  const renderCell = (
    article: TArticle,
    columnKey: keyof TArticle | typeof columns[number]["uid"]
  ) => {
    const cellVal = article[columnKey as keyof TArticle];
    switch (columnKey) {
      case "actions":
        return (
          <div className={styles.actions}>
            <Link href={`/articles/${article.id}`}>
              <a className={styles.info} title={"info"}>
                <FontAwesomeIcon icon={faInfo} />
              </a>
            </Link>
            <Link href={`/articles/${article.id}/edit`}>
              <a className={styles.edit} title={"edit"}>
                <FontAwesomeIcon icon={faPencil} />
              </a>
            </Link>
            <span
              className={styles.remove}
              title={"remove"}
              onClick={() => handleAction(article, "remove")}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        );
      case "title":
        return (
          <div className={styles.title}>
            <div className={styles.preview}>
              <img src={article.preview} alt={article.title} />
            </div>
            <Link href={`/articles/${article.id}`}>
              <a className={styles.text}>{article.title}</a>
            </Link>
          </div>
        );
      default:
        return cellVal;
    }
  };
  const search = useInput("");
  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.code !== "Enter") {
      return;
    }
    console.log(search.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={styles.admin}>
      <h2 className={styles.heading}>Articles Control</h2>
      <div className={styles.search}>
        <input
          onKeyUp={handleKeyUp}
          type="text"
          placeholder={"search for title or id and press Enter"}
          {...search.props}
        />
        <span className={styles.btn}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <Table
        renderCell={renderCell}
        columns={columns}
        data={data}
        primaryKey={"id"}
        withSelected
      />
      <Pagination
        className={styles.pagination}
        total={10}
        perPage={2}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AdminSection;
