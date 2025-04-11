import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      localStorage.setItem(key, JSON.stringify(initialValue));
    } finally {
      setIsInitialized(true);
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue, isInitialized]);

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
