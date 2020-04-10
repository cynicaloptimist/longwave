import { useState } from "react";

export function useStorageBackedState<T>(initialValue: T, key: string): [T, (value: T) => void] {

  const [value, setValue] = useState(initialValue);
  const storedItem = localStorage.getItem(key);

  if (storedItem !== null) {
    const storedValue = JSON.parse(storedItem);
    if (value !== storedValue) {
      setValue(storedValue);
    }
  }
  
  return [
    value,
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
  ];
}
