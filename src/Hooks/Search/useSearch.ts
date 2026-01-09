import { useState, useEffect } from "react";

export const useSearch = (initialValue: string = "", delay: number = 500) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return { searchQuery, setSearchQuery, debouncedValue };
};
