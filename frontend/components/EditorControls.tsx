import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import styles from "@modules/EditorControls.module.scss";
import faBold from "@icons/regular/faBold";
import faStrikethrough from "@icons/regular/faStrikethrough";
import faItalic from "@icons/regular/faItalic";
import faCode from "@icons/regular/faCode";
import faMinusHexagon from "@icons/regular/faMinusHexagon";
import faMinusOctagon from "@icons/regular/faMinusOctagon";
import faList from "@icons/regular/faList";
import faListOl from "@icons/regular/faListOl";
import faQuoteLeft from "@icons/solid/faQuoteLeft";
import faHorizontalRule from "@icons/regular/faHorizontalRule";
import faArrowDown from "@icons/regular/faArrowDown";
import faArrowRight from "@icons/regular/faArrowRight";
import faArrowLeft from "@icons/regular/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Level } from "@tiptap/extension-heading";
import faChevronDown from "@icons/regular/faChevronDown";

type EditorControlsProps = {
  editor: Editor | null;
};

const EditorControls = (props: EditorControlsProps) => {
  const { editor } = props;
  const [open, setOpen] = useState(false);
  const textTypes = [
    {
      text: "text",
      action: () => editor?.chain().focus().setParagraph().run(),
      active: editor?.isActive("paragraph"),
    },
    ...Array(5)
      .fill("")
      .map((v, i) => {
        const level = (i + 2) as Level;
        return {
          text: `header ${level}`,
          active: editor?.isActive("heading", { level }),
          action: () => editor?.chain().focus().toggleHeading({ level }).run(),
        };
      }),
  ];

  const actions = [
    {
      icon: faBold,
      title: "Bold",
      action: () => editor?.chain().focus().toggleBold().run(),
      active: editor?.isActive("bold"),
    },
    {
      icon: faStrikethrough,
      title: "Strike through",
      action: () => editor?.chain().focus().toggleStrike().run(),
      active: editor?.isActive("strike"),
    },
    {
      icon: faItalic,
      title: "Italic",
      action: () => editor?.chain().focus().toggleItalic().run(),
      active: editor?.isActive("italic"),
    },
    {
      icon: faCode,
      title: "Code",
      action: () => editor?.chain().focus().toggleCode().run(),
      active: editor?.isActive("code"),
    },
    {
      icon: faMinusHexagon,
      title: "clear marks",
      action: () => editor?.chain().focus().unsetAllMarks().run(),
    },
    {
      icon: faMinusOctagon,
      title: "clear nodes",
      action: () => editor?.chain().focus().clearNodes().run(),
    },
    {
      icon: faList,
      title: "bullet list",
      action: () => editor?.chain().focus().toggleBulletList().run(),
      active: editor?.isActive("bulletList"),
    },
    {
      icon: faListOl,
      title: "ordered list",
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      active: editor?.isActive("orderedList"),
    },
    {
      icon: faCode,
      title: "code block",
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      active: editor?.isActive("codeBlock"),
    },
    {
      icon: faQuoteLeft,
      title: "blockquote",
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      active: editor?.isActive("blockquote"),
    },
    {
      icon: faHorizontalRule,
      title: "horizontal rule",
      action: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: faArrowDown,
      title: "hard break",
      action: () => editor?.chain().focus().setHardBreak().run(),
    },
  ];
  const historyActions = [
    {
      icon: faArrowLeft,
      title: "undo",
      action: () => editor?.chain().focus().undo().run(),
    },
    {
      icon: faArrowRight,
      title: "redo",
      action: () => editor?.chain().focus().redo().run(),
    },
  ];

  if (!editor) return null;

  return (
    <div className={styles.controls}>
      <div className={styles.types} onClick={() => setOpen((v) => !v)}>
        <div className={styles.current}>
          <span className={styles.text}>
            {textTypes.find((t) => t.active)?.text}
          </span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        {open && (
          <div className={styles.list}>
            {textTypes.map((type) => {
              return (
                <span
                  className={clsx(
                    styles.option,
                    type.active && styles.optionActive
                  )}
                  key={type.text}
                  onClick={type.action}
                >
                  {type.text}
                </span>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.formatting}>
        {actions.map(({ icon, title, action, active }) => {
          return (
            <span
              onClick={action}
              title={`switch ${title}`}
              className={clsx(styles.action, active && styles.active)}
              key={title}
            >
              <FontAwesomeIcon icon={icon} />
            </span>
          );
        })}
      </div>
      <div className={styles.history}>
        {historyActions.map(({ icon, title, action }) => {
          return (
            <span
              onClick={action}
              title={title}
              className={styles.action}
              key={title}
            >
              <FontAwesomeIcon icon={icon} />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default EditorControls;
