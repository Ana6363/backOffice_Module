// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownHover from '../../components/Dropdown';

describe('DropdownHover Component', () => {
  it('renders the dropdown with default button label and menu items', () => {
    render(<DropdownHover />);

    // Check button label
    const button = screen.getByRole('button', { name: /hover/i });
    expect(button).toBeInTheDocument();

    // Check default menu items
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it('renders the dropdown with custom button label', () => {
    render(<DropdownHover buttonLabel="Custom Label" />);

    // Check custom button label
    const button = screen.getByRole('button', { name: /custom label/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the dropdown with custom menu items', () => {
    const customMenuItems = [
      { label: 'Custom Item 1', href: '/custom1' },
      { label: 'Custom Item 2', href: '/custom2' },
    ];

    render(<DropdownHover menuItems={customMenuItems} />);

    // Check custom menu items
    const item1 = screen.getByText('Custom Item 1');
    const item2 = screen.getByText('Custom Item 2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    // Check href attributes
    expect(item1.closest('a')).toHaveAttribute('href', '/custom1');
    expect(item2.closest('a')).toHaveAttribute('href', '/custom2');
  });

  it('applies additional className to the dropdown', () => {
    render(<DropdownHover className="custom-class" />);

    // Check if additional className is applied
    const dropdown = screen.getByRole('button', { name: /hover/i }).closest(
      '.dropdown'
    );
    expect(dropdown).toHaveClass('custom-class');
  });

  it('renders empty menu when no menu items are provided', () => {
    render(<DropdownHover menuItems={[]} />);

    // Check that no menu items are rendered
    const items = screen.queryAllByRole('listitem');
    expect(items.length).toBe(0);
  });
});
