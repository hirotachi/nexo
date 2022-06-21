import React, { useState } from "react";
import useClickOutside from "@hooks/useClickOutside";
import styles from "@modules/Dropdown.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChevronDown from "@icons/regular/faChevronDown";
import faChevronUp from "@icons/regular/faChevronUp";

type DropdownProps<T> = {
  value: T;
  options: T[];
  onClick: (option: T) => void;
};
const Dropdown = <T extends string | number>(props: DropdownProps<T>) => {
  const { options, value, onClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => isOpen && setIsOpen(false));
  return (
    <div
      ref={ref}
      onClick={() => setIsOpen((v) => !v)}
      className={styles.dropdown}
    >
      <span className={styles.current}>
        {value}
        <span className={styles.btn}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </span>
      </span>
      {isOpen && (
        <div className={styles.list}>
          {options.map((option) => {
            return (
              <span
                onClick={() => onClick(option)}
                key={option}
                className={clsx(
                  styles.option,
                  option === value && styles.selected
                )}
              >
                {option}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
