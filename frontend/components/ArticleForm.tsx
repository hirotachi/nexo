import React, { useState } from "react";
import styles from "@modules/ArticleForm.module.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import TagsInput from "@components/TagsInput";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import clsx from "clsx";

const CustomTitleDocument = Document.extend({
  content: "heading block*",
});

type ArticleFormInput = {
  title: string;
  tags: string[];
  preview: string;
  content: string;
  summary: string;
  section: string;
};

type ArticleFormProps = {
  onSubmit: (values: ArticleFormInput) => void;
  values?: ArticleFormInput;
};
const initialState = {
  title: "",
  tags: [],
  preview: "",
  content: "",
  summary: "",
  section: "",
};
const ArticleForm = (props: ArticleFormProps) => {
  const { values, onSubmit } = props;
  const [state, setState] = useState(values ?? initialState);
  const summary = useEditor({
    onUpdate: ({ editor }) => {
      updateField("summary", editor.getText());
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "Small summary about the article",
      }),
    ],
    content: state.summary,
  });

  const title = useEditor({
    extensions: [
      CustomTitleDocument,
      Heading.configure({
        levels: [2],
      }),
      Text,
      Placeholder.configure({
        placeholder: "Article title",
      }),
    ],
    onUpdate: ({ editor }) => {
      updateField("title", editor.getText());
    },
    content: state.title,
  });

  const content = useEditor({
    onUpdate: ({ editor }) => {
      updateField("content", editor.getText());
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: "Write your article here",
      }),
    ],
    content: state.content,
  });

  const cancel = () => {
    console.log("cancel");
  };
  const handleSubmit = () => {
    onSubmit(state);
  };

  const updateField = <K extends keyof typeof state>(
    key: K,
    value: typeof state[K] | ((current: typeof state[K]) => typeof state[K])
  ) => {
    setState({
      ...state,
      [key]: typeof value === "function" ? value(state[key]) : value,
    });
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.heading}>Create Article</h1>
      <div className={clsx(styles.field, styles.required)}>
        <span className={styles.label}>title</span>
        <EditorContent editor={title} className={styles.title} />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>summary</span>
        <EditorContent editor={summary} className={styles.summary} />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>tags</span>
        <TagsInput
          list={state.tags}
          onChange={(tags) => updateField("tags", tags)}
        />
      </div>
      <div>preview image</div>
      <div className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.btns}>
            <button className={styles.cancel}>cancel</button>
            <button className={styles.submit} onClick={handleSubmit}>
              {values ? "update" : "create"}
            </button>
          </div>
          <div className={styles.formatting}>formatting controls</div>
        </div>

        <EditorContent editor={content} />
      </div>
    </div>
  );
};

export default ArticleForm;
