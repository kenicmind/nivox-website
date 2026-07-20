import { Outlet } from 'react-router-dom';
import Navbar from '../../layout/Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#140726] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-10 sm:px-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
