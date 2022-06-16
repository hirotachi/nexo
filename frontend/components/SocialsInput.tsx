import React, { KeyboardEventHandler } from "react";
import styles from "@modules/SocialsInput.module.scss";
import useInput from "@hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@icons/regular/faTimes";
import { socialInfo } from "@utils/helpers";
import { socialIcons } from "@utils/constants";

type SocialsInputProps = {
  onChange: (socials: string[] | ((socials: string[]) => string[])) => void;
  value: string[];
};
const SocialsInput = (props: SocialsInputProps) => {
  const { value, onChange } = props;
  const socialInput = useInput("");
  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.code !== "Enter") {
      return;
    }
    console.log(socialInfo(socialInput.value.trim()));
    onChange((s) => [...s, socialInput.value.trim()]);
    socialInput.reset("");
  };

  const handleRemove = (link: string) => {
    onChange((s) => s.filter((v) => v !== link));
  };
  return (
    <div className={styles.socials}>
      <input
        type="text"
        {...socialInput.props}
        onKeyUp={handleKeyUp}
        placeholder={"Paste your social link and hit Enter"}
      />
      <div className={styles.list}>
        {value.map((link) => {
          const info = socialInfo(link);
          const icon = socialIcons[info.siteName] ?? socialIcons.other;
          return (
            <div className={styles.link} key={link}>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={icon} />
              </span>
              <a target={"__blank"} rel={"noreferrer noopener"} href={link}>
                {info.profileId || link}
              </a>
              <span
                className={styles.remove}
                onClick={() => handleRemove(link)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialsInput;
