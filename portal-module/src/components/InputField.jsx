import React from 'react';

const InputField = ({ placeholder, value, onChange, className }) => {
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
