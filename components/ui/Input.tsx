import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[18px] font-semibold text-text-primary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-bg-input text-text-primary rounded-[16px] px-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 placeholder-text-tertiary text-[17px] font-medium ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[14px] text-semantic-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
