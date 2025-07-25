import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import TableRow from "./TableRow";
import { userTableReducer } from "../model/slice";
import { initialUsers } from "../model/constants";

const styleMock = { top: 0, left: 0, width: 300, height: 50 };

function makeStore() {
  return configureStore({
    reducer: { userTable: userTableReducer },
    preloadedState: {
      userTable: {
        users: initialUsers,
        sortDirection: null,
        searchValue: "",
        userDetails: { id: null, name: "", email: "" },
        sidebarProps: { formType: null, formData: null },
      },
    },
  });
}

function renderRow(index = 0) {
  const store = makeStore();
  jest.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <TableRow data={undefined} index={index} style={styleMock} />
    </Provider>
  );
  return store;
}

describe("TableRow", () => {
  it("рендерит ячейки с корректными данными", () => {
    renderRow();

    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("Gwenborough")).toBeInTheDocument();
  });
});
