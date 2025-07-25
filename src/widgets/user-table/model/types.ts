export type UserTableHeadersType = "Имя" | "E-mail" | "Город";

export type UserTableSortByNamePayloadType = "asc" | "desc" | null;

export type UserTableSearchPayloadType = {
  group: UserTableHeadersType;
  value: string;
};

