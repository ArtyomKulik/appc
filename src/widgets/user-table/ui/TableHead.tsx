import { headerHeight, headers } from "../model/constants";
import SortByNameButton from "./SortButton";

import "./TableHead.scss";
export default function TableHead() {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        height: headerHeight,
        lineHeight: `${headerHeight}px`,
        background: "#f5f5f5",
        borderBottom: "1px solid #ccc",
      }}
    >
      {headers.map((text, idx) => {
        const isNameColumn = text === "Имя";
        return (
          <div className={"headerItem"} key={idx + text}>
            {text}
            {isNameColumn && <SortByNameButton />}
          </div>
        );
      })}
    </div>
  );
}
