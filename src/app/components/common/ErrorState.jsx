import { AlertTriangle } from 'lucide-react';
import Button from '../../../components/design/ui/Button';

const ErrorState = ({ title = 'Something went wrong', message = 'Please try again shortly.', onRetry }) => {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-white/10 bg-white/10 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-300">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/70">{message}</p>
        {onRetry && (
          <div className="mt-6">
            <Button onClick={onRetry} variant="primary">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
