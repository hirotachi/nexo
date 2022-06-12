import React from "react";
import styles from "@modules/AuthForm.module.scss";
import * as yup from "yup";
import useYupValidation from "@hooks/useYupValidation";
import useForm from "@hooks/useForm";
import Link from "next/link";
import clsx from "clsx";

export type FormConfig<T extends Record<string, any>> = {
  [P in keyof T]: {
    type?: string;
    placeholder?: string;
    label?: string;
    required?: boolean | string;
    validation?: any;
    sub?: {
      text: string;
      link?: string;
    };
  };
};
type AuthFormProps<T extends Record<string, any>> = {
  title: string;
  submit: {
    text?: string;
    link: string;
  };
  description?: string;
  other?: {
    link: string;
    intro?: string;
    text: string;
  };
  showRequired?: boolean;
  values: T;
  config: FormConfig<T>;
};

const AuthForm = <T,>(props: AuthFormProps<T>) => {
  type K = keyof T;
  const { title, submit, config, values, description, showRequired, other } =
    props;

  const { validate, errors } = useYupValidation(() => {
    return yup.object().shape(
      Object.keys(config).reduce((acc, key) => {
        const { validation, required } = config[key as K];
        if (validation) {
          // @ts-ignore
          acc[key] = validation ?? yup[typeof values[key]];
          if (required) {
            // @ts-ignore
            acc[key] = acc[key]?.required(
              typeof required === "string" ? required : undefined
            );
          }
        }
        return acc;
      }, {})
    );
  });
  const [state, updateField, { addTouched }] = useForm(values);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validate(state))) return;
    console.log(state);
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {other && (
        <div className={styles.other}>
          {other.intro && <p className={styles.otherIntro}>{other.intro}</p>}
          <Link href={other.link}>
            <a className={styles.otherLink}>{other.text}</a>
          </Link>
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        {Object.keys(values).map((key) => {
          const inputConfig = config[key as K];
          return (
            <div
              className={clsx(styles.field, errors[key] && styles.error)}
              key={key}
            >
              <div className={styles.intro}>
                <label className={styles.label} htmlFor={key}>
                  {inputConfig.label}
                  {inputConfig.required && showRequired && (
                    <span className={styles.required}>*</span>
                  )}
                </label>
                {inputConfig.sub && inputConfig.sub.link ? (
                  <Link href={inputConfig.sub.link}>
                    <a className={styles.sub}>{inputConfig.sub?.text}</a>
                  </Link>
                ) : (
                  <span className={styles.sub}>{inputConfig.sub?.text}</span>
                )}
              </div>
              <input
                className={styles.input}
                type={inputConfig.type}
                id={key}
                name={key}
                placeholder={inputConfig.placeholder}
                value={state[key]}
                onFocus={() => addTouched(key)}
                onChange={(e) => updateField(key, e.target.value)}
              />
              {errors[key] && (
                <p className={styles.errorMessage}>{errors[key]}</p>
              )}
            </div>
          );
        })}
        <button className={styles.submit} type="submit">
          {submit.text}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
