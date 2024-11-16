import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Drawer.css';

interface MenuItem {
  id: number;
  name: string;
  route: string;
}

interface DrawerComponentProps {
  menuItemsProp: MenuItem[];
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ menuItemsProp }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Close the drawer when clicking outside of it
  const handleOutsideClick = (event: MouseEvent) => {
    const drawer = document.querySelector('.drawer-side');
    const menuButton = document.querySelector('.drawer-side-trigger');
    if (drawer && !drawer.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to close drawer when clicking outside
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Toggle the drawer state when clicking the hamburger menu
  const handleMenuClick = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // Navigate to a route when a menu item is clicked
  const handleNavigation = (route: string) => {
    navigate(route);
    setIsDrawerOpen(false); // Close the drawer after navigating
  };

  return (
    <div className="drawer">
      {/* Navbar with menu and title */}
      <div className="navbar bg-base-300 w-full">
        <div className="flex-none">
          {/* Menu button (hamburger) */}
          <button className="btn btn-ghost drawer-side-trigger" onClick={handleMenuClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        {/* Navbar Title */}
        <div className="mx-2 flex-1 px-2 text-xl font-bold">Hospital G47</div>
      </div>

      {/* Sidebar content */}
      <div className={`drawer-side ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="menu bg-base-200 min-h-full p-4">
          {menuItemsProp.map((item) => (
            <li key={item.id}>
              <div onClick={() => handleNavigation(item.route)}>
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrawerComponent;
