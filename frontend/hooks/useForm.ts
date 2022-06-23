import { useState } from "react";

function useForm<T>(values: T) {
  const [touched, setTouched] = useState(
    Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<keyof T, boolean>
    )
  );
  const [state, setState] = useState<T>(values);
  const clear = () => setState(values as T);
  const updateField = <K extends keyof T>(
    field: K,
    value: T[K] | ((val: T[K]) => T[K])
  ) => {
    setState((s) => ({
      ...s,
      [field]: typeof value === "function" ? value(s[field]) : value,
    }));
  };
  const addTouched = (field: keyof T) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };
  const updateState = (newState: Partial<T>) => {
    setState((s) => ({ ...s, ...newState }));
  };
  return [
    state,
    updateField,
    updateState,
    { touched, addTouched },
    clear,
  ] as const;
}

export default useForm;
