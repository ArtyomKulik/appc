import type { User } from "../../../entitites/user";
import users from "../../../shared/data/users.json";
import type { UserTableHeadersType } from "./types";
export const initialUsers = users as User[];

export const headers: UserTableHeadersType[] = ["Имя", "E-mail", "Город"];
export const headersLength = headers.length;

export const headerHeight = 30;

export const rootId = "user-table";
