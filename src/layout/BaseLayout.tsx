import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function BaseLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
