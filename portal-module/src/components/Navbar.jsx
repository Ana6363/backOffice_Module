import React from 'react';

const Navbar = () => {
  return (
    <div className="drawer">
      {/* Drawer Toggle */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            {/* Drawer toggle button */}
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
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
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <a href="/" className="text-lg font-bold">daisyUI</a>
          </div>
          <div className="hidden lg:flex-none lg:block">
            {/* Navbar Menu */}
            <ul className="menu menu-horizontal">
              <li><a href="/">Navbar Item 1</a></li>
              <li><a href="/">Navbar Item 2</a></li>
              {/* Dropdown */}
              <li className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                  Dropdown
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
                >
                  <li><a href="/">Item 1</a></li>
                  <li><a href="/">Item 2</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="p-4">
          Content
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><a href="/">Sidebar Item 1</a></li>
          <li><a href="/">Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
