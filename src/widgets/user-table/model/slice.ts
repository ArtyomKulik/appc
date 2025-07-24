import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialUsers } from "./constants";
import type { User } from "../../../entitites/user";
import type { UserDetailsType, UserTableSortByNamePayloadType } from "./types";

interface UserTableState {
  usersInit: User[];
  users: User[];
  loading: boolean;
  error: string | null;
  sortDirection: UserTableSortByNamePayloadType;
  searchValue: string;
  userDetails: UserDetailsType;
  isUserDetailsCardOpen: boolean;
  editFormIsOpen: boolean;
}

const initialState: UserTableState = {
  usersInit: initialUsers,
  users: initialUsers,
  sortDirection: null,
  loading: false,
  error: null,
  searchValue: "",
  userDetails: { id: null, name: "", email: "" },
  isUserDetailsCardOpen: false,
  editFormIsOpen: false,
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
          state.users = [...state.usersInit];
          break;
        default:
          state.sortDirection = null;
          state.users = [...state.usersInit];
          break;
      }
    },
    searchByName: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload.toLowerCase().trim();

      if (!searchValue) {
        state.users = [...state.usersInit];
        return;
      }
      state.users = state.usersInit.filter((user) => {
        const [name, surname] = user.name.toLowerCase().split(" ");
        return name.includes(searchValue) || surname.includes(searchValue);
      });
    },

    resetSearchByName: (state) => {
      //   state.users = state.usersInit;
      //   state.searchValue = "";
    },
    toggleUserDetailsCardOpen: (state) => {
      state.isUserDetailsCardOpen = !state.isUserDetailsCardOpen;
    },
    fullfillUserDetailsInCard: (state, action: PayloadAction<UserDetailsType>) => {
      state.userDetails = action.payload;
    },
    editUserDetails: (state, action: PayloadAction<UserDetailsType>) => {
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
  toggleUserDetailsCardOpen,
  fullfillUserDetailsInCard,
  editUserDetails,
} = userTableSlice.actions;
export const userTableReducer = userTableSlice.reducer;

export default userTableSlice.reducer;
