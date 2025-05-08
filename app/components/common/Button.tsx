import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, onClick, disabled, className, style, type }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={
        className
          ? className
          : 'bg-primary text-white px-4 py-2 rounded-md cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed'
      }
    >
      {children}
    </button>
  );
};

export default Button;
