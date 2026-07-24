import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { bootstrapCurrentUserAsAdmin } from '../../services/adminService';

const AdminBootstrapPage = () => {
  const { user, isAdmin, authInitialized } = useContext(AuthContext);
  const [state, setState] = useState('checking');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authInitialized) return;
    if (!user) { setState('login'); return; }
    if (isAdmin) { setState('configured'); return; }
    setState('available');
  }, [authInitialized, isAdmin, user]);

  if (state === 'login') return (
    <main className="flex min-h-screen items-center justify-center bg-[#140726] px-6">
      <section className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-8 text-center text-white backdrop-blur-xl">
        <h1 className="text-3xl font-black">Sign in to continue</h1>
        <p className="mt-3 text-white/70">Sign in with the existing account you want to promote, then return to this page. No new account will be created.</p>
        <Link to="/login" className="mt-8 block rounded-xl bg-[#FFD54A] py-3 font-bold text-[#140726]">Go to Student Login</Link>
      </section>
    </main>
  );
  if (state === 'configured') return <div className="min-h-screen bg-[#140726] p-8 text-center text-xl font-bold text-white">Administrator already configured.</div>;
  if (state !== 'available') return <div className="min-h-screen bg-[#140726] p-8 text-center text-[#FFE7A3]">Checking administrator setup…</div>;

  const promote = async () => {
    setBusy(true);
    try {
      await bootstrapCurrentUserAsAdmin();
      toast.success('Administrator access enabled.');
      window.location.assign('/admin/dashboard');
    } catch (error) {
      setState(error.message === 'Administrator already configured.' ? 'configured' : 'available');
      toast.error(error.message);
    } finally { setBusy(false); }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#140726] px-6">
      <section className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-8 text-center text-white backdrop-blur-xl">
        <h1 className="text-3xl font-black">Administrator Bootstrap</h1>
        <p className="mt-3 text-white/70">Use this once to promote the currently signed-in account. This page permanently closes after an administrator is configured.</p>
        <button type="button" onClick={promote} disabled={busy} className="mt-8 w-full rounded-xl bg-[#FFD54A] py-3 font-bold text-[#140726] disabled:opacity-60">{busy ? 'Configuring…' : 'Become Administrator'}</button>
      </section>
    </main>
  );
};

export default AdminBootstrapPage;
