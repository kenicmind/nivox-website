import Button from '../ui/Button';
import Input from './Input';

const NewsletterForm = () => {
  return (
    <form className="flex flex-col gap-3 rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:flex-row">
      <Input placeholder="Enter your email" className="min-w-[220px]" />
      <Button type="submit" variant="primary">
        Notify Me
      </Button>
    </form>
  );
};

export default NewsletterForm;
