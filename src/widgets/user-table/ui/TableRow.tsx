import type { ListChildComponentProps } from "react-window";
import { useAppDispatch, useAppSelector } from "../../../shared";
import { fullfillUserDetailsInCard } from "../model/slice";

import "./TableRow.scss";

export default function TableRow({ index, style }: ListChildComponentProps) {
  const dispatch = useAppDispatch();
 

  const users = useAppSelector((store) => store.userTable.users);

  const user = users[index];
  const { id, name, email } = user || {};
  return (
    <div
      className={"table_row"}
      style={{
        ...style,
      }}
    >
      <div className="cell" style={{ flex: 1 }}>
        {user.name}
      </div>
      <div className="cell" style={{ flex: 1 }}>
        {user.email}
      </div>
      <div className="cell" style={{ flex: 1 }}>
        {user.city}
      </div>

      <div
        className="row_details"
        onClick={() => {
        //   if (!isUserDetailsOpen) {
        //     dispatch(
        //       fullfillUserDetailsInCard({
        //         id: id,
        //         name: name,
        //         email: email,
        //       })
        //     );
        //   }

        //   dispatch(toggleUserDetailsCardOpen());
        }}
      >
        Подробнее
      </div>
    </div>
  );
}
