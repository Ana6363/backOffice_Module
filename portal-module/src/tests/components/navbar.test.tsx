// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import DrawerComponent from '../../components/Navbar/Navbar';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DrawerComponent', () => {
  const mockNavigate = jest.fn();
  const menuItems = [
    { id: 1, name: 'Home', route: '/' },
    { id: 2, name: 'About', route: '/about' },
    { id: 3, name: 'Contact', route: '/contact' },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the navbar with the title and menu button', () => {
    render(
      <MemoryRouter>
        <DrawerComponent menuItemsProp={menuItems} />
      </MemoryRouter>
    );

    expect(screen.getByText('Hospital G47')).toBeInTheDocument();
    expect(screen.getByTitle('Toggle Menu')).toBeInTheDocument();
  });

  it('renders the menu items in the sidebar', () => {
    render(
      <MemoryRouter>
        <DrawerComponent menuItemsProp={menuItems} />
      </MemoryRouter>
    );

    menuItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('navigates to the correct route when a menu item is clicked', () => {
    render(
      <MemoryRouter>
        <DrawerComponent menuItemsProp={menuItems} />
      </MemoryRouter>
    );

    const menuItem = screen.getByText('Home');
    fireEvent.click(menuItem);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
