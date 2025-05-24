import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function BaseLayout() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div>
      {isAuthenticated && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
