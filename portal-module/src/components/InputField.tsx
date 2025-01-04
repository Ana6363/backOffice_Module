import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  placeholder?: string; // Optional placeholder for the input field
  value: string; // Current value of the input field
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Handler for change events
  className?: string; // Optional additional CSS classes
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = "Enter text...", // Default placeholder text
  value,
  onChange,
  className = "", // Default to an empty string if no additional classes are provided
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input input-bordered w-full max-w-xs ${className}`}
    />
  );
};

export default InputField;
