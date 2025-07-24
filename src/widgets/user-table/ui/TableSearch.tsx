import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../shared";
import useDebounce from "../../../shared/lib/hooks/useDebounce";
import { resetSearchByName, searchByName } from "../model/slice";

export default function TableSearch() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce({ value: search, debounceTime: 500 });

  useEffect(() => {
    dispatch(searchByName(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div>
      <input
        type="search"
        placeholder="Поиск..."
        value={search}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          const nativeEvent = e.nativeEvent as InputEvent;
          if (
            nativeEvent.inputType === "deleteContentForward" &&
            e.currentTarget.value === ""
          ) {
            // dispatch(resetSearchByName());
          }
        }}
        onChange={(e) => {
          const value = e.target.value;

          setSearch(value);
        }}
      />
    </div>
  );
}
