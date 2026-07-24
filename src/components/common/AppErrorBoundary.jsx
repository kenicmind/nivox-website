import { Component } from 'react';

class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('NIVOX route failure', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#140726] px-4 text-white">
        <section className="w-full max-w-lg rounded-[32px] border border-[#FFD54A]/25 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <img className="mx-auto h-14 w-14 rounded-2xl" src="/images/logo.png" alt="" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#FFD54A]">NIVOX</p>
          <h1 className="mt-3 text-3xl font-black">This page needs a fresh start</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Your session is safe. Reload the page to reconnect to the platform.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-[#FFD54A] px-6 py-3 text-sm font-bold text-[#140726] outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Reload NIVOX
          </button>
        </section>
      </main>
    );
  }
}

export default AppErrorBoundary;
