import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'ref'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, helperText, as = 'input', rows = 3, ...props }, ref) => {
    const baseStyles = 'input input-bordered w-full';
    
    const errorStyles = error ? 'input-error' : '';
    
    const iconStyles = clsx(
      'absolute top-1/2 transform -translate-y-1/2',
      leftIcon && 'left-3',
      rightIcon && 'right-3'
    );

    const inputWrapperStyles = clsx(
      'relative',
      (leftIcon || rightIcon) && 'flex items-center'
    );

    const inputStyles = clsx(
      baseStyles,
      errorStyles,
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      className
    );

    const Component = as === 'textarea' ? 'textarea' : 'input';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        
        <div className={inputWrapperStyles}>
          {leftIcon && (
            <span className={twMerge(iconStyles, 'text-neutral')}>
              {leftIcon}
            </span>
          )}
          
          <Component
            ref={ref as any} // Revert back to 'as any' to resolve TS error with polymorphic component + forwardRef
            className={twMerge(inputStyles)}
            aria-invalid={error ? 'true' : 'false'}
            rows={as === 'textarea' ? rows : undefined}
            {...props}
          />
          
          {rightIcon && (
            <span className={twMerge(iconStyles, 'text-neutral')}>
              {rightIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p className={clsx(
            'mt-1 text-sm',
            error ? 'text-red-500' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
