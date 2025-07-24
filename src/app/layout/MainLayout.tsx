import { Outlet } from "react-router";
import "./MainLayout.scss";

export default function MainLayout() {
  return (
    <>
      {/* <Header /> */}
      <main className="app">
        <div className="container">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
