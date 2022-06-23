import React, { useMemo, useState } from "react";
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
const Dropdown = <T extends string | number | { label: string; val: any }>(
  props: DropdownProps<T>
) => {
  const { options, value, onClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => isOpen && setIsOpen(false));
  const current = useMemo(() => {
    return typeof options[0] === "object"
      ? options.find((o) => o.val === value)?.label
      : options.find((o) => o === value);
  }, [value, options]);
  return (
    <div
      ref={ref}
      onClick={() => setIsOpen((v) => !v)}
      className={styles.dropdown}
    >
      <span className={styles.current}>
        {current}
        <span className={styles.btn}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </span>
      </span>
      {isOpen && (
        <div className={styles.list}>
          {options.map((option) => {
            const label = typeof option === "object" ? option.label : option;
            const val = typeof option === "object" ? option.val : option;
            const isSelected = val === value;
            return (
              <span
                onClick={() => onClick(option)}
                key={label}
                className={clsx(styles.option, isSelected && styles.selected)}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
