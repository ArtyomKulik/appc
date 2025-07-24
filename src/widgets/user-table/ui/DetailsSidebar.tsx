import { useAppDispatch, useAppSelector } from "../../../shared";
import "./UserDetailsCard.scss";
import { editUserDetails } from "../model/slice";
import type { UserDetailsFormDataType } from "../model/types";
import { useEffect } from "react";
export default function DetailsSidebar() {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.userTable.userDetails);
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as UserDetailsFormDataType;
    dispatch(editUserDetails({ ...formData, id: userDetails.id }));
  };

 ;
  return (
    <div className="user_details_card" onClick={(e) => e.stopPropagation()}>
      <div className="user_details_card_inner">
        <div
          className="icon_close"
          onClick={() => {
          }}
        >
          Х
        </div>
        <form onSubmit={handleSubmit}>
          <input name="name" defaultValue={userDetails.name} />
          <input name="email" defaultValue={userDetails.email} />
          <button type="submit" onClick={() => {}}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
