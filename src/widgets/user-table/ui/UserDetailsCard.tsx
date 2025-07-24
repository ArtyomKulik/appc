import { useAppDispatch, useAppSelector } from "../../../shared";
import "./UserDetailsCard.scss";
import { editUserDetails, toggleUserDetailsCardOpen } from "../model/slice";
import type { UserDetailsFormDataType } from "../model/types";
import { useEffect } from "react";
export default function UserDetailsCard() {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.userTable.userDetails);
  const isUserDetailsOpen = useAppSelector(
    (state) => state.userTable.isUserDetailsCardOpen
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as UserDetailsFormDataType;
    dispatch(editUserDetails({ ...formData, id: userDetails.id }));
  };

  useEffect(() => {
    if (!isUserDetailsOpen) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const modal = document.querySelector(".user_details_card");

      if (modal && !modal.contains(target)) {
        dispatch(toggleUserDetailsCardOpen());
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleClick);
    };
  }, [isUserDetailsOpen, dispatch]);
  return (
    <div className="user_details_card" onClick={(e) => e.stopPropagation()}>
      <div className="user_details_card_inner">
        <div
          className="icon_close"
          onClick={() => {
            dispatch(toggleUserDetailsCardOpen());
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
