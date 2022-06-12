import React from "react";
import styles from "@modules/TagsInput.module.scss";

type TagInput = { id: number | string; name: string };
type TagsInputProps = {
  list: TagInput[];
  onChange: (tags: TagInput[]) => void;
};
const TagsInput = (props: TagsInputProps) => {
  const { onChange, list } = props;
  return <div className={styles.wrapper}>tags input</div>;
};

export default TagsInput;
