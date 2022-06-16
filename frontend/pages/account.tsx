import React, { FormEventHandler, useState } from "react";
import useForm from "@hooks/useForm";
import styles from "@modules/Account.module.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import SocialsInput from "@components/SocialsInput";
import AvatarInput from "@components/AvatarInput";

const accountValues: Pick<
  TUser,
  "name" | "headline" | "description" | "socials"
> = {
  name: "",
  headline: "",
  description: "",
  socials: [],
};

const Account = () => {
  const [accountState, updateAccountState] = useForm(accountValues);
  const [password, updatePassword] = useForm({
    currentPassword: "",
    newPassword: "",
  });
  const [avatar, setAvatar] = useState(
    "https://cdn.dribbble.com/users/42578/avatars/small/d0ac345ce3f79bf2c2e7e64527bbf342.jpg?1530900788"
  );

  const handleAccountSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(accountState);
  };

  const handlePasswordSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(password);
  };

  const labels: {
    [P in keyof (typeof accountState | typeof password)]?: string;
  } = {
    currentPassword: "current Password",
    newPassword: "new password",
  };

  const description = useEditor({
    onUpdate: ({ editor }) => {
      updateAccountState("description", editor.getText());
    },
    extensions: [Document, Paragraph, Text],
    content: accountState.description,
  });

  return (
    <div className={styles.account}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>account settings</h2>
        <p className={styles.text}>
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <AvatarInput
        value={avatar}
        onChange={(v) => setAvatar(v)}
        defaultText={accountState.name}
      />
      <form onSubmit={handleAccountSubmit} className={styles.accountForm}>
        {Object.entries(accountState).map(([key, val]) => {
          const k = key as keyof typeof accountState;
          let inputComp = (
            <input
              type="text"
              className={styles.input}
              value={accountState[k]}
              onChange={(e) => updateAccountState(k, e.target.value)}
            />
          );
          switch (key as keyof typeof accountState) {
            case "description":
              inputComp = (
                <EditorContent
                  editor={description}
                  className={styles.description}
                />
              );
              break;
            case "socials":
              inputComp = (
                <SocialsInput
                  onChange={(socials) => updateAccountState("socials", socials)}
                  value={accountState.socials}
                />
              );
              break;
          }
          return (
            <label className={styles.field} key={key}>
              <span className={styles.label}>{labels[k] ?? k}</span>
              {inputComp}
            </label>
          );
        })}
        <button>save</button>
      </form>
      <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
        <h3 className={styles.heading}>Password Change</h3>
        {Object.entries(password).map(([key, val]) => {
          const k = key as keyof typeof password;
          return (
            <label className={styles.field} key={key}>
              <span className={styles.label}>{labels[k] ?? k}</span>
              <input
                className={styles.input}
                type="text"
                value={password[k]}
                onChange={(e) => updatePassword(k, e.target.value)}
              />
            </label>
          );
        })}
        <button>update password</button>
      </form>
    </div>
  );
};

export default Account;
