import type { DetailsSidebarPropsType, UserDetailsType } from "../../../shared";
import { initialUsers } from "./constants";
import {
  userTableReducer,
  sortTableByName,
  searchByName,
  resetSearchByName,
  setSidebarProps,
  editUser,
} from "./slice";

const mockUsers = initialUsers;

const initialState: Parameters<typeof userTableReducer>[0] = {
  users: mockUsers,
  sortDirection: null,
  searchValue: "",
  userDetails: { id: null, name: "", email: "" },
  sidebarProps: { formType: null, formData: null },
};

describe("userTableSlice", () => {
  describe("sortTableByName", () => {
    it("сортирует по возрастанию (asc)", () => {
      const { users } = userTableReducer(initialState, sortTableByName("asc"));

      const isAscSorted = users.every(
        (curr, idx, arr) => idx === 0 || arr[idx - 1].name.localeCompare(curr.name) <= 0
      );

      expect(isAscSorted).toBe(true);
    });

    it("сортирует по убыванию (desc)", () => {
      const { users } = userTableReducer(initialState, sortTableByName("desc"));

      const isDescSorted = users.every(
        (curr, idx, arr) => idx === 0 || arr[idx - 1].name.localeCompare(curr.name) >= 0
      );

      expect(isDescSorted).toBe(true);
    });

    it("сбрасывает порядок при null", () => {
      const state = userTableReducer(initialState, sortTableByName(null));
      expect(state.users).toEqual(mockUsers);
      expect(state.sortDirection).toBeNull();
    });

    it("не мутирует исходный массив", () => {
      const state = userTableReducer(initialState, sortTableByName("asc"));
      expect(state.users).not.toBe(initialState.users);
      expect(initialState.users).toEqual(mockUsers);
    });
  });

  describe("searchByName", () => {
    it("фильтрует без учёта регистра", () => {
      const state = userTableReducer(initialState, searchByName("ervin"));
      expect(state.users).toHaveLength(1);
      expect(state.users[0].name).toBe("Ervin Howell");
    });

    it("возвращает все записи при пустой строке", () => {
      const state = userTableReducer(initialState, searchByName(""));
      expect(state.users).toEqual(mockUsers);
    });

    it("возвращает 0 при отсутствии совпадений", () => {
      const state = userTableReducer(initialState, searchByName("xyz"));
      expect(state.users).toHaveLength(0);
    });
  });

  describe("resetSearchByName", () => {
    it("сбрасывает users и searchValue", () => {
      const filtered = userTableReducer(initialState, searchByName("leanne"));
      const reset = userTableReducer(filtered, resetSearchByName());
      expect(reset.users).toEqual(mockUsers);
      expect(reset.searchValue).toBe("");
    });
  });

  describe("setSidebarProps", () => {
    const sidebarOpen: DetailsSidebarPropsType = {
      formType: "userDetails",
      formData: { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
    };

    it("открывает сайдбар c данными", () => {
      const state = userTableReducer(initialState, setSidebarProps(sidebarOpen));
      expect(state.sidebarProps).toEqual(sidebarOpen);
    });

    it("закрывает сайдбар", () => {
      const opened = userTableReducer(initialState, setSidebarProps(sidebarOpen));
      const closed = userTableReducer(
        opened,
        setSidebarProps({ formType: null, formData: null })
      );
      expect(closed.sidebarProps.formType).toBeNull();
      expect(closed.sidebarProps.formData).toBeNull();
    });
  });

  describe("editUser", () => {
    const updated: UserDetailsType = {
      id: 1,
      name: "Leanne Updated",
      email: "update@test.com",
    };

    it("обновляет данные выбранного пользователя", () => {
      const state = userTableReducer(initialState, editUser(updated));
      const user = state.users.find((u) => u.id === 1);
      expect(user).toMatchObject(updated);
    });

    it("не затрагивает других пользователей", () => {
      const state = userTableReducer(initialState, editUser(updated));
      const untouched = state.users.filter((u) => u.id !== 1);
      const original = mockUsers.filter((u) => u.id !== 1);
      expect(untouched).toEqual(original);
    });

    it("ничего не делает, если id не найден", () => {
      const state = userTableReducer(
        initialState,
        editUser({ id: 999, name: "x", email: "x" })
      );
      expect(state.users).toEqual(mockUsers);
    });
  });

  describe("edge cases", () => {
    it("возвращает состояние без изменений при неизвестном action", () => {
      const state = userTableReducer(initialState, { type: "UNKNOWN" });
      expect(state).toEqual(initialState);
    });

    it("не мутирует корневой объект state", () => {
      const state = userTableReducer(initialState, sortTableByName("asc"));
      expect(state).not.toBe(initialState);
    });
  });
});
