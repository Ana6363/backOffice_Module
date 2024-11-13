import React from 'react';

const DropdownHover = () => {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">Hover</div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li><a href="/">Item 1</a></li>
        <li><a href="/">Item 2</a></li>
      </ul>
    </div>
  );
};

export default DropdownHover;
