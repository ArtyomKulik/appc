import type { User } from "../../../entitites/user";
import {
  editUserDetails,
  fullfillUserDetailsInCard,
  resetSearchByName,
  searchByName,
  sortTableByName,
  userTableReducer,
} from "./slice";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    city: "Gwenborough",
    phone: "+77707368031",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    city: "Wisokyburgh",
    phone: "+77707368542",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    city: "McKenziehaven",
    phone: "+77707367928",
  },
];

const initialState: Parameters<typeof userTableReducer>[0] = {
  usersInit: mockUsers,
  users: mockUsers,
  sortDirection: null,
  loading: false,
  error: null,
  searchValue: "",
  userDetails: { id: null, name: "", email: "" },
  isUserDetailsCardOpen: false,
  editFormIsOpen: false,
};

describe("userTableSlice", () => {
  describe("sortTableByName", () => {
    test("should sort users in ascending order", () => {
      const action = sortTableByName("asc");
      const newState = userTableReducer(initialState, action);

      expect(newState.users[0].name).toBe("Clementine Bauch");
      expect(newState.users[1].name).toBe("Ervin Howell");
      expect(newState.users[2].name).toBe("Leanne Graham");
    });

    test("should sort users in descending order", () => {
      const action = sortTableByName("desc");
      const newState = userTableReducer(initialState, action);

      expect(newState.users[0].name).toBe("Leanne Graham");
      expect(newState.users[1].name).toBe("Ervin Howell");
      expect(newState.users[2].name).toBe("Clementine Bauch");
    });

    test("should reset to initial order when direction is null", () => {
      const action = sortTableByName(null);
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toEqual(mockUsers);
    });

    test("should not mutate original array", () => {
      const action = sortTableByName("asc");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).not.toBe(initialState.users);
      expect(initialState.users).toEqual(mockUsers);
    });
  });

  describe("searchByName", () => {
    test("should filter users by name (case insensitive)", () => {
      const action = searchByName("leanne");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toHaveLength(1);
      expect(newState.users[0].name).toBe("Leanne Graham");
    });

    test("should handle uppercase search term", () => {
      const action = searchByName("ERVIN");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toHaveLength(1);
      expect(newState.users[0].name).toBe("Ervin Howell");
    });

    test("should return empty array when no matches found", () => {
      const action = searchByName("nonexistent");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toHaveLength(0);
    });

    test("should return all users when search is empty", () => {
      const action = searchByName("");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toEqual(mockUsers);
    });

    test("should search by partial name match", () => {
      const action = searchByName("e");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toHaveLength(3); // все имена содержат "e"
      expect(newState.users.some((user) => user.name === "Leanne Graham")).toBe(true);
      expect(newState.users.some((user) => user.name === "Ervin Howell")).toBe(true);
      expect(newState.users.some((user) => user.name === "Clementine Bauch")).toBe(true);
    });

    test("should search by specific partial match", () => {
      const action = searchByName("clem");
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toHaveLength(1);
      expect(newState.users[0].name).toBe("Clementine Bauch");
    });
  });

  describe("resetSearchByName", () => {
    test("should reset users to initial state and clear search value", () => {
      const stateWithSearch = {
        ...initialState,
        users: [mockUsers[0]], // filtered state
        searchValue: "leanne",
      };

      const action = resetSearchByName();
      const newState = userTableReducer(stateWithSearch, action);

      expect(newState.users).toEqual(mockUsers);
      expect(newState.searchValue).toBe("");
    });

    test("should not affect other state properties", () => {
      const stateWithSearch = {
        ...initialState,
        users: [mockUsers[0]],
        searchValue: "leanne",
        loading: true,
        isUserDetailsCardOpen: true,
      };

      const action = resetSearchByName();
      const newState = userTableReducer(stateWithSearch, action);

      expect(newState.loading).toBe(true);
      expect(newState.isUserDetailsCardOpen).toBe(true);
    });
  });

  describe("toggleUserDetailsCardOpen", () => {
    test("should toggle isUserDetailsCardOpen from false to true", () => {
      const action = toggleUserDetailsCardOpen();
      const newState = userTableReducer(initialState, action);

      expect(newState.isUserDetailsCardOpen).toBe(true);
    });

    test("should toggle isUserDetailsCardOpen from true to false", () => {
      const stateWithOpenCard = {
        ...initialState,
        isUserDetailsCardOpen: true,
      };

      const action = toggleUserDetailsCardOpen();
      const newState = userTableReducer(stateWithOpenCard, action);

      expect(newState.isUserDetailsCardOpen).toBe(false);
    });

    test("should not affect other state properties", () => {
      const action = toggleUserDetailsCardOpen();
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toBe(initialState.users);
      expect(newState.loading).toBe(initialState.loading);
      expect(newState.searchValue).toBe(initialState.searchValue);
    });
  });

  describe("fullfillUserDetailsInCard", () => {
    test("should set user details", () => {
      const userDetails = { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" };
      const action = fullfillUserDetailsInCard(userDetails);
      const newState = userTableReducer(initialState, action);

      expect(newState.userDetails).toEqual(userDetails);
    });

    test("should replace existing user details", () => {
      const stateWithUserDetails = {
        ...initialState,
        userDetails: { id: 1, name: "Old Name", email: "old@email.com" },
      };

      const newUserDetails = { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" };
      const action = fullfillUserDetailsInCard(newUserDetails);
      const newState = userTableReducer(stateWithUserDetails, action);

      expect(newState.userDetails).toEqual(newUserDetails);
      expect(newState.userDetails.id).toBe(2);
    });
  });

  describe("editUserDetails", () => {
    test("should update user details in users array", () => {
      const updatedUser = {
        id: 1,
        name: "Leanne Updated",
        email: "leanne.updated@test.com",
      };
      const action = editUserDetails(updatedUser);
      const newState = userTableReducer(initialState, action);

      const editedUser = newState.users.find((user) => user.id === 1);
      expect(editedUser?.name).toBe("Leanne Updated");
      expect(editedUser?.email).toBe("leanne.updated@test.com");
      expect(editedUser?.city).toBe("Gwenborough"); // city should remain unchanged
    });

    test("should not affect other users", () => {
      const updatedUser = {
        id: 1,
        name: "Leanne Updated",
        email: "leanne.updated@test.com",
      };
      const action = editUserDetails(updatedUser);
      const newState = userTableReducer(initialState, action);

      const otherUsers = newState.users.filter((user) => user.id !== 1);
      const originalOtherUsers = mockUsers.filter((user) => user.id !== 1);

      expect(otherUsers).toEqual(originalOtherUsers);
    });

    test("should handle non-existent user id gracefully", () => {
      const nonExistentUser = { id: 999, name: "Non Existent", email: "none@test.com" };
      const action = editUserDetails(nonExistentUser);
      const newState = userTableReducer(initialState, action);

      expect(newState.users).toEqual(mockUsers); // no changes
    });

    test("should create new users array (immutability)", () => {
      const updatedUser = {
        id: 1,
        name: "Leanne Updated",
        email: "leanne.updated@test.com",
      };
      const action = editUserDetails(updatedUser);
      const newState = userTableReducer(initialState, action);

      expect(newState.users).not.toBe(initialState.users);
    });
  });

  describe("edge cases and state immutability", () => {
    test("should handle unknown action", () => {
      const newState = userTableReducer(initialState, { type: "UNKNOWN_ACTION" } as any);
      expect(newState).toEqual(initialState);
    });

    test("should maintain state immutability", () => {
      const action = sortTableByName("asc");
      const newState = userTableReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.users).not.toBe(initialState.users);
      expect(initialState.users).toEqual(mockUsers); // original unchanged
    });

    test("should handle undefined initial state", () => {
      const action = sortTableByName("asc");
      const newState = userTableReducer(undefined, action);

      expect(newState).toBeDefined();
      expect(newState.users).toBeDefined();
    });
  });

  describe("complex integration scenarios", () => {
    test("should handle search and sort combination", () => {
      let state = initialState;

      // Search for users with "e" in name
      state = userTableReducer(state, searchByName("e"));
      expect(state.users).toHaveLength(3);

      // Then sort
      state = userTableReducer(state, sortTableByName("asc"));
      expect(state.users[0].name).toBe("Clementine Bauch");
      expect(state.users[1].name).toBe("Ervin Howell");
      expect(state.users[2].name).toBe("Leanne Graham");
    });

    test("should handle edit after search", () => {
      let state = initialState;

      // Search
      state = userTableReducer(state, searchByName("leanne"));

      // Edit user
      state = userTableReducer(
        state,
        editUserDetails({
          id: 1,
          name: "Leanne Updated",
          email: "leanne.updated@test.com",
        })
      );

      const editedUser = state.users.find((user) => user.id === 1);
      expect(editedUser?.name).toBe("Leanne Updated");
    });

    test("should handle reset after sort", () => {
      let state = initialState;

      state = userTableReducer(state, sortTableByName("desc"));
      expect(state.users[0].name).toBe("Leanne Graham");

      // Reset
      state = userTableReducer(state, resetSearchByName());
      expect(state.users).toEqual(mockUsers); // back to original order
    });

    test("should handle user details flow", () => {
      let state = initialState;

      // Open card
      state = userTableReducer(state, toggleUserDetailsCardOpen());
      expect(state.isUserDetailsCardOpen).toBe(true);

      // Fill details
      state = userTableReducer(
        state,
        fullfillUserDetailsInCard({
          id: 1,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
        })
      );
      expect(state.userDetails.id).toBe(1);

      // Edit user
      state = userTableReducer(
        state,
        editUserDetails({
          id: 1,
          name: "Leanne Modified",
          email: "leanne.modified@test.com",
        })
      );

      const modifiedUser = state.users.find((user) => user.id === 1);
      expect(modifiedUser?.name).toBe("Leanne Modified");
    });
  });
});
