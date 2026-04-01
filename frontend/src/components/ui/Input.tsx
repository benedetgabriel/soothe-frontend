import { forwardRef, useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isPassword = false, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : (type ?? 'text');

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium tracking-wide text-on-surface-variant mb-2 uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-12 px-5 rounded-[1.5rem]
              bg-surface-container-high text-on-surface
              border-none outline-none
              transition-all duration-200
              placeholder:text-on-surface-variant/40
              focus:bg-surface-container-highest
              focus:ring-1 focus:ring-outline-variant/20
              ${error ? 'ring-1 ring-error/40' : ''}
              ${isPassword ? 'pr-12' : ''}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface bg-transparent border-none cursor-pointer p-0"
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
