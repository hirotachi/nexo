import React from "react";
import styles from "@modules/Checkbox.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCheck from "@icons/regular/faCheck";

type CheckboxProps = {
  onClick: () => void;
  checked: "semi" | boolean;
};

const Checkbox = (props: CheckboxProps) => {
  const { onClick, checked } = props;
  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.checkbox,
        checked && styles.checked,
        checked === "semi" && styles.semi
      )}
    >
      {checked && checked !== "semi" && <FontAwesomeIcon icon={faCheck} />}
    </div>
  );
};

export default Checkbox;
