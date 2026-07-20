import { twMerge } from 'tailwind-merge';

const SectionWrapper = ({ children, className = '', id, as: Component = 'section', ...props }) => {
  return (
    <Component id={id} className={twMerge('py-20 sm:py-24 lg:py-32', className)} {...props}>
      {children}
    </Component>
  );
};

export default SectionWrapper;
