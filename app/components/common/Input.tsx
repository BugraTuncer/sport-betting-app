import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  required: boolean;
  className: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  name,
  type,
  autoComplete,
  required,
  className,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
