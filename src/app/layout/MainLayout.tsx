import { Outlet } from "react-router";
import "./MainLayout.scss";
import { Header } from "../../widgets";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="app">
        <div className="container">
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
