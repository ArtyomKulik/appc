import { BrowserRouter, Routes, Route } from "react-router";

import Home from "../../pages/home/ui/Home";
import { MainLayout } from "../layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
