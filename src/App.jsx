import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AppRouter from './routes/router';
import Loader from './components/common/Loader';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <>
      <AuthProvider>
        <AppRouter />
        <AnimatePresence>
          {showInitialLoader && (
            <Loader onComplete={() => setShowInitialLoader(false)} />
          )}
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}

export default App;
