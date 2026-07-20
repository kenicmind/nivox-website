import { Inbox } from 'lucide-react';
import Button from '../../../components/design/ui/Button';

const EmptyState = ({ title = 'No items yet', message = 'There is nothing to show here right now.', actionLabel, onAction }) => {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-[28px] border border-white/10 bg-white/10 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl">
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A]">
          <Inbox className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/70">{message}</p>
        {actionLabel && onAction && (
          <div className="mt-6">
            <Button onClick={onAction} variant="primary">
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
