// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuComponent from '../../components/Menu/Menu';

describe('MenuComponent', () => {
  const onSelectMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the basic menu with all items', () => {
    render(
      <MenuComponent type="basic" onSelect={onSelectMock} selectedItem={null} />
    );

    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    const item3 = screen.getByText('Item 3');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it('renders the dropdown menu with submenu', () => {
    render(
      <MenuComponent type="dropdown" onSelect={onSelectMock} selectedItem={null} />
    );

    const item1 = screen.getByText('Item 1');
    const submenuParent = screen.getByText('Parent');
    const submenu1 = screen.getByText('Submenu 1');
    const submenu2 = screen.getByText('Submenu 2');

    expect(item1).toBeInTheDocument();
    expect(submenuParent).toBeInTheDocument();
    expect(submenu1).toBeInTheDocument();
    expect(submenu2).toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked (basic menu)', () => {
    render(
      <MenuComponent type="basic" onSelect={onSelectMock} selectedItem={null} />
    );

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('Item 1');
  });

  it('calls onSelect when a submenu item is clicked (dropdown menu)', () => {
    render(
      <MenuComponent type="dropdown" onSelect={onSelectMock} selectedItem={null} />
    );

    const submenu1 = screen.getByText('Submenu 1');
    fireEvent.click(submenu1);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('Submenu 1');
  });

  it('applies "selected" class to the selected item', () => {
    render(
      <MenuComponent type="basic" onSelect={onSelectMock} selectedItem="Item 2" />
    );

    const item2 = screen.getByText('Item 2');
    expect(item2).toHaveClass('selected');
  });

  it('does not apply "selected" class to unselected items', () => {
    render(
      <MenuComponent type="basic" onSelect={onSelectMock} selectedItem="Item 2" />
    );

    const item1 = screen.getByText('Item 1');
    const item3 = screen.getByText('Item 3');

    expect(item1).not.toHaveClass('selected');
    expect(item3).not.toHaveClass('selected');
  });
});
