import React from "react";
import styles from "@modules/AvatarInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faArrowAltFromBottom from "@icons/solid/faArrowAltFromBottom";

type AvatarInputProps = {
  value: string;
  onChange: (val: string) => void;
  defaultText?: string;
};

const AvatarInput = (props: AvatarInputProps) => {
  const { defaultText, value, onChange } = props;
  const submitChange = () => {
    console.log(value);
  };
  const handleRemove = () => {
    console.log("remove");
  };
  return (
    <div className={styles.avatar}>
      <div className={styles.img}>
        <span className={styles.text}>
          {defaultText
            ?.split("")
            .map((v) => v[0])
            .join("")}
        </span>
        <img src={value} alt={value} />
        <span className={styles.edit}>
          <FontAwesomeIcon icon={faArrowAltFromBottom} />
        </span>
      </div>
      <div className={styles.controls}>
        <button className={styles.submit} onClick={submitChange}>
          {value ? "change" : "upload"}
        </button>
        <button className={styles.remove} onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  );
};

export default AvatarInput;
