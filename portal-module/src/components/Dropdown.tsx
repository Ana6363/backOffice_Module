import React from 'react';

interface DropdownHoverProps {
  buttonLabel?: string; // Optional label for the dropdown button
  menuItems?: { label: string; href: string }[]; // Optional array of menu items
  className?: string; // Optional additional CSS classes for the dropdown
}

const DropdownHover: React.FC<DropdownHoverProps> = ({
  buttonLabel = "Hover", // Default button label
  menuItems = [
    { label: "Item 1", href: "/" },
    { label: "Item 2", href: "/" },
  ], // Default menu items
  className = "", // Additional optional className
}) => {
  return (
    <div className={`dropdown dropdown-hover ${className}`}>
      {/* Button */}
      <div tabIndex={0} role="button" className="btn m-1">
        {buttonLabel}
      </div>

      {/* Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownHover;
