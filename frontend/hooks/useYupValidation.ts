import { useMemo, useState } from "react";
import * as yup from "yup";

type Errors<T> = Record<keyof T, string>;

function useYupValidation<T extends Record<string, any>>(
  schema?: T | (() => T),
  fromValues?: boolean
) {
  // @ts-ignore
  const validationSchema = useMemo<T>(() => {
    const initial = typeof schema === "function" ? schema() : schema;
    if (!fromValues) return initial;
    const result = {};
    Object.keys(initial).forEach((key) => {
      // @ts-ignore
      result[key] = yup[typeof initial[key]]?.();
    });
    return yup.object().shape(result);
  }, [fromValues, schema]);

  type ErrorState = Errors<typeof validationSchema>;

  const [errors, setErrors] = useState<ErrorState>({} as ErrorState);
  const validate = (values: Record<keyof T, any>) => {
    return validationSchema
      .validate(values, { abortEarly: false, strict: true })
      .then(() => {
        setErrors({} as ErrorState);
        return true;
      })
      .catch((err) => {
        const verificationError = err.inner.reduce((a, c) => {
          return { ...a, [c.path]: c.message };
        }, {});
        setErrors(verificationError);
        return false;
      });
  };
  return { schema: validationSchema, errors, validate };
}

export default useYupValidation;
