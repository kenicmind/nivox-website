import Button from '../ui/Button';
import Input from './Input';
import Textarea from './Textarea';

const PartnerForm = () => {
  return (
    <form className="space-y-4 rounded-[24px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
      <Input label="Organization" placeholder="Your organization name" />
      <Input label="Email" type="email" placeholder="name@company.com" />
      <Textarea label="How would you like to partner?" placeholder="Tell us about your interest..." />
      <Button type="submit" variant="primary" className="w-full">
        Submit Inquiry
      </Button>
    </form>
  );
};

export default PartnerForm;
