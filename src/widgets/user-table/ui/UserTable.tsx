import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import "./UserTable.scss";

import TableHead from "./TableHead";
import Row from "./TableRow";
import { useAppSelector } from "../../../shared";
import DetailsSidebar from "../../details-sidebar/ui/DetailsSidebar";
import { rootId } from "../model/constants";

export default function UserTable() {
  const users = useAppSelector((store) => store.userTable.users);

  const rowHeight = 50;

  return (
    <>
      <div className="table_wrapper" id={rootId}>
        <TableHead />
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height}
              itemCount={users.length}
              itemSize={rowHeight}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>

      {<DetailsSidebar containerId={rootId} />}
    </>
  );
}
