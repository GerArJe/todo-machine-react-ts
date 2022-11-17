import React from "react";

function useLocalStorage<A>(
  itemName: string,
  initialValue: A
): {
  items: A;
  saveItems: (newItems: A) => void;
  loading: boolean;
  error: any;
} {
  const [loading, setLoading] = React.useState(true);
  const [error, setError]: [any, React.Dispatch<React.SetStateAction<any>>] =
    React.useState(false);
  const [items, setItem] = React.useState(initialValue);
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItems: A;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify([]));
          parsedItems = initialValue;
        } else {
          parsedItems = JSON.parse(localStorageItem);
        }
        setItem(parsedItems);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });

  const saveItems = (newItems: A) => {
    try {
      const stringifiedItems = JSON.stringify(newItems);
      localStorage.setItem(itemName, stringifiedItems);
      setItem(newItems);
    } catch (error) {
      setError(error);
    }
  };

  return { items, saveItems, loading, error };
}

export { useLocalStorage };
