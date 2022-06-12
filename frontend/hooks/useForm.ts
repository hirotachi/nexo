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
  const updateField = (field: keyof T, value: any) => {
    setState((s) => ({ ...s, [field]: value }));
  };
  const addTouched = (field: keyof T) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };
  return [state, updateField, { touched, addTouched }, clear] as const;
}

export default useForm;
