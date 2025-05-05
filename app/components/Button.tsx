import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({ children, onClick, disabled, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
