import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import "./UserTable.scss";

import TableHead from "./TableHead";
import Row from "./TableRow";
import { useAppSelector } from "../../../shared";
import UserDetailsCard from "./UserDetailsCard";

export default function UserTable() {
  const users = useAppSelector((store) => store.userTable.users);
  const isUserDetailsOpen = useAppSelector(
    (state) => state.userTable.isUserDetailsCardOpen
  );

  const rowHeight = 50;

  return (
    <>
      <div className="table_wrapper">
        <TableHead />
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height}
              itemCount={users.length - 1}
              itemSize={rowHeight}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>

      {isUserDetailsOpen && <UserDetailsCard />}
    </>
  );
}
