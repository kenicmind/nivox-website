import { Outlet } from "react-router-dom";
import ScrollProgress from "../ScrollProgress";
import ScrollToTopButton from "../ScrollToTopButton";
import Navbar from "../../layout/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#140726] text-white">
      <ScrollProgress />

      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-10 sm:px-8 lg:px-10">
        <Outlet />
      </main>

      <ScrollToTopButton />
    </div>
  );
};

export default Layout;