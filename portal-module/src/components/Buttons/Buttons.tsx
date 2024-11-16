import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;       // The button label or content
  onClick: () => void;       // Function for click event
  className?: string;        // Optional custom styles
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = 'btn-primary' }) => {
  return (
    <button
      type="button"                // Ensures button type
      className={`btn btn-active ${className}`}  // Combines default and custom classes
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
