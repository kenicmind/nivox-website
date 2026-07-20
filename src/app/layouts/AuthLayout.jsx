import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.16),transparent_35%),linear-gradient(135deg,#140726_0%,#1e1038_100%)] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
