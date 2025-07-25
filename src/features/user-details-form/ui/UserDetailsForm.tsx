import {
  useAppDispatch,
  type UserDetailsFormDataType,
  type UserDetailsType,
} from "../../../shared";
import { editUser } from "../../../widgets/user-table/model/slice";

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
    <form onSubmit={handleSubmit}>
      <input name="name" defaultValue={name} />
      <input name="email" defaultValue={email} />
      <button type="submit">Сохранить</button>
    </form>
  );
}
