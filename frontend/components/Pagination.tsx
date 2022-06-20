import React from "react";
import styles from "@modules/Pagination.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChevronLeft from "@icons/solid/faChevronLeft";
import faChevronRight from "@icons/solid/faChevronRight";
import clsx from "clsx";

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = (props: PaginationProps) => {
  const { total, perPage, currentPage, onPageChange, className } = props;
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className={clsx(styles.pagination, className)}>
      <span
        className={clsx(styles.btn, currentPage <= 1 && styles.disabled)}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      <div className={styles.current}>
        <span>
          {currentPage}/{totalPages}
        </span>
      </div>
      <span
        className={clsx(
          styles.btn,
          currentPage === totalPages && styles.disabled
        )}
        onClick={() =>
          currentPage !== totalPages && onPageChange(currentPage + 1)
        }
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
};

export default Pagination;
