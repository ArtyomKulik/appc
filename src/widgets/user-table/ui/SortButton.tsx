import { ArrowDown, ArrowUp, Minus } from "../../../shared";
import { useAppDispatch } from "../../../shared/lib";
import { sortTableByName } from "../model/slice";
import type { UserTableSortByNamePayloadType } from "../model/types";

import "./SortButton.scss";

export default function SortByNameButton() {
  const dispatch = useAppDispatch();

  const sortHandler = (direction: UserTableSortByNamePayloadType) => {
    dispatch(sortTableByName(direction));
  };

  return (
    <div className="sort-button-group">
      <ArrowUp className="sort-icon" onClick={() => sortHandler("asc")} />
      <Minus className="sort-icon" onClick={() => sortHandler(null)} />
      <ArrowDown className="sort-icon" onClick={() => sortHandler("desc")} />
    </div>
  );
}
