import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  children: ReactNode; // The button label or content
  onClick?: (e: React.FormEvent) => void; // Optional function for click event
  className?: string; // Optional custom styles
  disabled?: boolean; // Optional disabled state
  type?: "button" | "submit" | "reset"; // Allow setting button type
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = 'btn-primary',
  disabled = false,
  type = "button", // Default to "button" if not specified
}) => {
  return (
    <button
      type={type} // Dynamically apply the type
      className={`btn btn-active ${className}`}
      onClick={onClick}
      disabled={disabled} // Support disabled state
    >
      {children}
    </button>
  );
};

export default Button;
