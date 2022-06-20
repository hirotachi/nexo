import React, { KeyboardEventHandler, useState } from "react";
import styles from "@modules/Admin.module.scss";
import { arrayOf } from "@utils/helpers";
import { userData } from "@utils/data";
import Table, { ColumnConfig } from "@components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faInfo from "@icons/regular/faInfo";
import faPencil from "@icons/regular/faPencil";
import faTrash from "@icons/regular/faTrash";
import useInput from "@hooks/useInput";
import faSearch from "@icons/regular/faSearch";
import Pagination from "@components/Pagination";

const data: TUser[] = arrayOf(10, userData).map((v, i) => ({ ...v, id: i }));

const AdminSection = () => {
  const columns: ColumnConfig<keyof TUser | string>[] = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name", stretch: true },
    { name: "HEADLINE", uid: "headline", hideOnMobile: true, stretch: true },
    { name: "ROLE", uid: "role", hideOnMobile: true },
    { name: "ACTIONS", uid: "actions" },
  ];
  const handleAction = (user: TUser, actions: "remove" | "view" | "edit") => {
    switch (actions) {
      case "remove":
        console.log("remove user", user);
        break;
      case "view":
        console.log("view user", user);
        break;
      case "edit":
        console.log("edit user", user);
        break;
    }
  };
  const renderCell = (
    user: TUser,
    columnKey: keyof TUser | typeof columns[number]["uid"]
  ) => {
    const cellVal = user[columnKey as keyof TUser];
    switch (columnKey) {
      case "actions":
        return (
          <div className={styles.actions}>
            <span
              className={styles.info}
              title={"info"}
              onClick={() => handleAction(user, "view")}
            >
              <FontAwesomeIcon icon={faInfo} />
            </span>
            <span
              className={styles.edit}
              title={"edit"}
              onClick={() => handleAction(user, "edit")}
            >
              <FontAwesomeIcon icon={faPencil} />
            </span>
            <span
              className={styles.remove}
              title={"remove"}
              onClick={() => handleAction(user, "remove")}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        );
      case "name":
        return (
          <div className={styles.name}>
            <span className={styles.avatar}>
              <img src={user.avatar} alt={user.name} />
            </span>
            <div className={styles.info}>
              <span className={styles.infoName}>{user.name}</span>
              <span className={styles.infoEmail}>{user.email}</span>
            </div>
          </div>
        );
      case "headline":
        return <span className={styles.headline}>{cellVal}</span>;
      case "role":
        return <span className={styles.role}>{cellVal}</span>;
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
      <h2 className={styles.heading}>Users Control</h2>
      <div className={styles.search}>
        <input
          onKeyUp={handleKeyUp}
          type="text"
          placeholder={"search for name, headline or id and press Enter"}
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
