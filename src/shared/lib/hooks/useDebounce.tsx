import { useEffect, useState } from "react";

type UseDebounceProps = {
  value: string;
  debounceTime: number;
};

export default function useDebounce({ value, debounceTime = 300 }: UseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, debounceTime]);

  return debouncedValue;
}
