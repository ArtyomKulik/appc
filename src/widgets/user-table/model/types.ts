export type UserTableHeadersType = "Имя" | "E-mail" | "Город";

export type UserTableSortByNamePayloadType = "asc" | "desc" | null;

export type UserTableSearchPayloadType = {
  group: UserTableHeadersType;
  value: string;
};

export type UserDetailsType = {
  id: number | null;
  name: string;
  email: string;
};

export type UserDetailsFormDataType = Omit<UserDetailsType, "id">;
