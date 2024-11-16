import React from 'react';
import './Menu.css';

interface MenuProps {
  onSelect: (item: string) => void; // Callback function to handle selection
  selectedItem: string | null; // Selected item
}

const BasicMenu: React.FC<MenuProps> = ({ onSelect, selectedItem }) => {
  return (
    <ul className="menu bg-base-200 rounded-box w-56">
      <li>
        <a
          onClick={() => onSelect('Item 1')}
          className={selectedItem === 'Item 1' ? 'selected' : ''}
        >
          Item 1
        </a>
      </li>
      <li>
        <a
          onClick={() => onSelect('Item 2')}
          className={selectedItem === 'Item 2' ? 'selected' : ''}
        >
          Item 2
        </a>
      </li>
      <li>
        <a
          onClick={() => onSelect('Item 3')}
          className={selectedItem === 'Item 3' ? 'selected' : ''}
        >
          Item 3
        </a>
      </li>
    </ul>
  );
};

const DropdownMenu: React.FC<MenuProps> = ({ onSelect, selectedItem }) => {
  return (
    <ul className="menu bg-base-200 rounded-box w-56">
      <li>
        <a
          onClick={() => onSelect('Item 1')}
          className={selectedItem === 'Item 1' ? 'selected' : ''}
        >
          Item 1
        </a>
      </li>
      <li>
        <a
          onClick={() => onSelect('Item 2')}
          className={selectedItem === 'Item 2' ? 'selected' : ''}
        >
          Item 2
        </a>
      </li>
      <li>
        <a
          onClick={() => onSelect('Item 3')}
          className={selectedItem === 'Item 3' ? 'selected' : ''}
        >
          Item 3
        </a>
      </li>
      <li>
        <span className="menu-dropdown-toggle">Parent</span>
        <ul className="menu-dropdown">
          <li>
            <a
              onClick={() => onSelect('Submenu 1')}
              className={selectedItem === 'Submenu 1' ? 'selected' : ''}
            >
              Submenu 1
            </a>
          </li>
          <li>
            <a
              onClick={() => onSelect('Submenu 2')}
              className={selectedItem === 'Submenu 2' ? 'selected' : ''}
            >
              Submenu 2
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

interface MenuComponentProps extends MenuProps {
  type: 'basic' | 'dropdown'; // Specifies menu type
}

const MenuComponent: React.FC<MenuComponentProps> = ({ type, onSelect, selectedItem }) => {
  return (
    <div>
      {type === 'dropdown' ? (
        <DropdownMenu onSelect={onSelect} selectedItem={selectedItem} />
      ) : (
        <BasicMenu onSelect={onSelect} selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default MenuComponent;
