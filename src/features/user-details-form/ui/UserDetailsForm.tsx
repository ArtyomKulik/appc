import {
  useAppDispatch,
  type UserDetailsFormDataType,
  type UserDetailsType,
} from "../../../shared";
import { editUser } from "../../../widgets/user-table/model/slice";
import "./UserDetailsForm.scss";
export default function UserDetailsForm({ id, name, email }: Partial<UserDetailsType>) {
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as UserDetailsFormDataType;

    dispatch(editUser({ ...formData, id: id }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="user-name">Имя</label>
      <input id="user-name" name="name" defaultValue={name} />
      <label htmlFor="user-email">Email</label>
      <input name="user-email" defaultValue={email} />
      <button type="submit">Сохранить</button>
    </form>
  );
}
