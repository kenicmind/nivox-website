import { Outlet } from "react-router-dom";
import ScrollProgress from "../ScrollProgress";
import ScrollToTopButton from "../ScrollToTopButton";
import Navbar from "../../layout/Navbar";
import FooterSection from "../../sections/FooterSection";
import useOfflineDetector from "../../../hooks/useOfflineDetector";

const Layout = () => {
  useOfflineDetector();

  return (
    <div className="min-h-screen bg-[#140726] text-white">
      <ScrollProgress />

      <Navbar />

      <main className="w-full pt-20">
        <Outlet />
      </main>

      <FooterSection />

      <ScrollToTopButton />
    </div>
  );
};

export default Layout;