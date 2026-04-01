import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', block = false, className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-b from-primary to-primary-dim text-on-primary rounded-full shadow-[0_20px_40px_rgba(47,52,48,0.1)] hover:shadow-[0_10px_20px_rgba(47,52,48,0.08)]',
      secondary:
        'bg-primary-container text-on-primary-container rounded-full hover:bg-surface-container-highest',
      ghost:
        'bg-transparent text-on-surface-variant hover:bg-surface-container-high rounded-lg',
      link:
        'bg-transparent text-primary hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'h-10 px-6 text-sm',
      md: 'h-12 px-10 text-base',
      lg: 'h-14 px-10 text-base',
    };

    const width = block ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${width} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
