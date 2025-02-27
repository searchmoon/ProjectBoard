import { ChangeEvent, useState } from 'react';

interface ReturnType<T> {
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  values: T;
}

export default function useInputs<T extends Record<string, string>>(
  initialValues: T,
): ReturnType<T> {
  const [values, setValues] = useState<T>(initialValues);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in values) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return { values, onChangeValue };
}
