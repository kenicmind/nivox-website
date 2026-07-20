import { Outlet } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import FooterSection from '../../components/sections/FooterSection';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#140726] text-white">
      <Navbar />
      <main className="min-h-[calc(100vh-5rem)]">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
};

export default PublicLayout;
