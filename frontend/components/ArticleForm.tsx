import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import EditorControls from "@components/EditorControls";
import Dropdown from "@components/Dropdown";
import useSWR from "swr";

const CustomTitleDocument = Document.extend({
  content: "heading block*",
});

export type ArticleFormInput = {
  title: string;
  topics: string[];
  preview: string;
  content: string;
  summary: string;
  sectionId: string;
};

type ArticleFormProps = {
  onSubmit: (values: ArticleFormInput) => void;
  values?: ArticleFormInput;
};
const initialState: ArticleFormInput = {
  title: "",
  topics: [],
  preview: "",
  content: "",
  summary: "",
  sectionId: undefined,
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
      updateField("title", editor.getText().replace(/\n+/g, ""));
    },
    content: state.title,
  });

  const content = useEditor({
    onUpdate: ({ editor }) => {
      updateField("content", editor.getHTML());
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

  const handleSubmit = () => {
    onSubmit?.(state);
  };

  const updateField = <K extends keyof typeof state>(
    key: K,
    value: typeof state[K] | ((current: typeof state[K]) => typeof state[K])
  ) => {
    setState((v) => ({
      ...v,
      [key]: typeof value === "function" ? value(v[key]) : value,
    }));
  };
  const sections = useSWR("/sections");
  useEffect(() => {
    if (sections.data && state.sectionId === undefined) {
      updateField("sectionId", sections.data?.[0].id);
    }
  }, [sections.data]);
  const router = useRouter();
  return (
    <div className={styles.form}>
      <h1 className={styles.heading}>{values ? "Update" : "Create"} Article</h1>
      <div className={clsx(styles.field, styles.required)}>
        <span className={styles.label}>title</span>
        <EditorContent editor={title} className={styles.title} />
      </div>
      <div className={clsx(styles.field, styles.required)}>
        <span className={styles.label}>Section</span>
        <Dropdown
          value={state.sectionId}
          options={
            sections.data?.map((s) => ({ val: s.id, label: s.name })) ?? []
          }
          onClick={(option) => updateField("sectionId", option.val)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>summary</span>
        <EditorContent editor={summary} className={styles.summary} />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>tags</span>
        <TagsInput
          list={state.topics}
          onChange={(tags) => updateField("topics", tags)}
        />
      </div>
      <div className={clsx(styles.field, styles.required)}>
        <span className={styles.label}>Preview Image</span>
        <input
          type={"text"}
          value={state.preview}
          onChange={(e) => updateField("preview", e.target.value)}
          placeholder={"Preview image link"}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.btns}>
            {values && (
              <button className={styles.cancel} onClick={() => router.back()}>
                cancel
              </button>
            )}
            <button className={styles.submit} onClick={handleSubmit}>
              {values ? "update" : "create"}
            </button>
          </div>
          <EditorControls editor={content} />
        </div>

        <EditorContent editor={content} className={styles.content} />
      </div>
    </div>
  );
};

export default ArticleForm;
