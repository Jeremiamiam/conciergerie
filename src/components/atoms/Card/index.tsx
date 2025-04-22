import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isHoverable?: boolean;
  isClickable?: boolean;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = twMerge(
    clsx('card-title px-6 py-4', className)
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = twMerge(
    clsx('card-body', className)
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const classes = twMerge(
    clsx('card-actions px-6 py-4', className)
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const Card: CardComponent = ({
  children,
  className,
  variant = 'elevated',
  padding = 'md',
  isHoverable = false,
  isClickable = false,
  ...props
}) => {
  const baseStyles = 'card';

  const variantStyles = {
    elevated: 'card-normal shadow',
    outlined: 'card-bordered',
    filled: 'bg-base-200',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const interactionStyles = clsx(
    isHoverable && 'hover:shadow-lg transition-shadow duration-200',
    isClickable && 'cursor-pointer active:scale-[0.98] transition-transform duration-200'
  );

  const classes = twMerge(
    clsx(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      interactionStyles,
      className
    )
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card; 