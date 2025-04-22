import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  padding = 'md',
  centered = true,
  ...props
}) => {
  const baseStyles = 'w-full mx-auto';

  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddingStyles = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  };

  const classes = twMerge(
    clsx(
      baseStyles,
      sizeStyles[size],
      paddingStyles[padding],
      centered && 'mx-auto',
      className
    )
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container; 