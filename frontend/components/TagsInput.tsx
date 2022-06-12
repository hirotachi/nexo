import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@modules/TagsInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@icons/regular/faTimes";
import useInput from "@hooks/useInput";
import clsx from "clsx";
import faPlus from "@icons/regular/faPlus";

type TagsInputProps = {
  list: string[];
  onChange: (cb: (tags: string[]) => string[]) => void;
};
const TagsInput = (props: TagsInputProps) => {
  const { onChange, list } = props;
  const [highlighted, setHighlighted] = useState<string>("");

  const handleRemove = (tag: string) => {
    onChange((tags) => tags.filter((t) => t !== tag));
  };
  const tagInput = useInput("");
  const id = useRef<NodeJS.Timeout>(null);

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter" || !tagInput.value) return;

    if (list.includes(tagInput.value.toLowerCase())) {
      setHighlighted(tagInput.value.toLowerCase());
      id.current = setTimeout(() => setHighlighted(""), 1000);
      return;
    }
    onChange((tags) => [...tags, tagInput.value.toLowerCase()]);
    tagInput.reset();
  };

  useEffect(() => {
    return () => clearTimeout(id.current as NodeJS.Timeout);
  }, []);
  return (
    <div
      className={clsx(styles.wrapper, tagInput.focused && styles.focused)}
      onClick={tagInput.focus}
    >
      {list.map((tag) => {
        return (
          <div
            key={tag}
            className={clsx(
              styles.tag,
              highlighted === tag && styles.highlighted
            )}
          >
            <span className={styles.name}>{tag}</span>
            <span
              className={styles.remove}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(tag);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        );
      })}
      <div className={styles.input}>
        {!tagInput.focused && !tagInput.value && (
          <span className={styles.placeholder}>
            <FontAwesomeIcon icon={faPlus} />
            Add tags
          </span>
        )}
        <input
          onKeyUp={handleKeyUp}
          style={{ width: (tagInput.value.length || 1) * 10 }}
          type="text"
          {...tagInput.props}
        />
      </div>
    </div>
  );
};

export default TagsInput;
