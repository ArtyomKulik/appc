import { useAppDispatch, useAppSelector } from "../../../shared";
import { sortTableByName } from "../model/slice";
import type { UserTableSortByNamePayloadType } from "../model/types";

import "./SortButton.scss";

export default function SortByNameButton() {
  const sortDirection = useAppSelector((store) => store.userTable.sortDirection);
  const dispatch = useAppDispatch();

  const sortHandler = (direction: UserTableSortByNamePayloadType) => {
    dispatch(sortTableByName(direction));
  };

  return (
    <span className="sort-icons">
      <svg
        onClick={() => sortHandler("asc")}
        className={`arrow up ${sortDirection === "asc" ? "active" : ""}`}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 0L10 6H0L5 0Z" fill="#555" />
      </svg>
      <svg
        onClick={() => sortHandler(null)}
        className={`icon minus ${sortDirection === null ? "active" : ""}`}
        width="12"
        height="2"
        viewBox="0 0 12 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="14" height="4" fill="#555" />
      </svg>
      <svg
        onClick={() => sortHandler("desc")}
        className={`arrow down ${sortDirection === "desc" ? "active" : ""}`}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L10 0L5 6L0 0Z" fill="#555" />
      </svg>
    </span>
  );
}
