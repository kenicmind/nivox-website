import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useOfflineDetector = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Internet connection restored.', { id: 'network-status' });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You are currently offline. Local features enabled.', { id: 'network-status', duration: 5000 });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOfflineDetector;
