import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialUsers } from "./constants";
import type { User } from "../../../entitites/user";
import type { UserTableSortByNamePayloadType } from "./types";
import type { DetailsSidebarPropsType, UserDetailsType } from "../../../shared";

interface UserTableState {
  users: User[];
  sortDirection: UserTableSortByNamePayloadType;
  searchValue: string;
  userDetails: UserDetailsType;
  sidebarProps: DetailsSidebarPropsType;
}

const initialState: UserTableState = {
  users: initialUsers,
  sortDirection: null,
  searchValue: "",
  userDetails: { id: null, name: "", email: "" },
  sidebarProps: {
    formType: null,
    formData: null,
  },
};

const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    sortTableByName: (state, action: PayloadAction<UserTableSortByNamePayloadType>) => {
      const direction = action.payload;
      switch (direction) {
        case "asc":
          state.users = [...state.users].sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case "desc":
          state.users = [...state.users].sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        case null:
          state.sortDirection = null;
          state.users = [...initialUsers];
          break;
        default:
          state.sortDirection = null;
          state.users = [...initialUsers];
          break;
      }
    },
    searchByName: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload.toLowerCase().trim();
      if (!searchValue) {
        state.users = [...initialUsers];
        return;
      }
      state.users = initialUsers.filter((user) => {
        const [name, surname] = user.name.toLowerCase().split(" ");
        return name.includes(searchValue) || surname.includes(searchValue);
      });
    },

    resetSearchByName: (state) => {
      state.users = initialUsers;
      state.searchValue = "";
    },
    setSidebarProps: (state, action: PayloadAction<DetailsSidebarPropsType>) => {
      state.sidebarProps.formData = action.payload.formData;
      state.sidebarProps.formType = action.payload.formType;
    },
    editUser: (state, action: PayloadAction<UserDetailsType>) => {
      const { id, name, email } = action.payload;
      state.users = state.users.map((user) => {
        return user.id === id ? { ...user, name, email } : user;
      });
    },
  },
});

export const {
  sortTableByName,
  searchByName,
  resetSearchByName,
  setSidebarProps,
  editUser,
} = userTableSlice.actions;
export const userTableReducer = userTableSlice.reducer;

export default userTableSlice.reducer;
