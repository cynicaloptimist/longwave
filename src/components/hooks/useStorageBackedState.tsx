import { useState } from "react";

export function useStorageBackedState<T>(
  initialValue: T,
  key: string
): [T, (value: T) => void] {
  const storedItem = localStorage.getItem(key);
  if (storedItem == null) {
    localStorage.setItem(key, JSON.stringify(initialValue));
  } else {
    initialValue = JSON.parse(storedItem);
  }

  const [value, setValue] = useState(initialValue);

  return [
    value,
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
  ];
}
