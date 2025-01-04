// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectableTable from '../../components/Table/SelectableTable';

describe('SelectableTable Component', () => {
  const mockOnRowSelect = jest.fn();
  const mockData = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];
  const mockHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with headers and data', () => {
    render(
      <SelectableTable data={mockData} headers={mockHeaders} onRowSelect={mockOnRowSelect} />
    );

    // Check if headers are rendered
    mockHeaders.forEach((header) => {
      expect(screen.getByText(header.label)).toBeInTheDocument();
    });

    // Check if rows are rendered
    mockData.forEach((row) => {
      expect(screen.getByText(String(row.id))).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(String(row.age))).toBeInTheDocument();
    });
  });

  it('calls onRowSelect with null when all rows are deselected', () => {
    render(
      <SelectableTable data={mockData} headers={mockHeaders} onRowSelect={mockOnRowSelect} />
    );

    // Select the first row
    const checkbox = screen.getAllByRole('checkbox')[1]; // Skip the header checkbox
    fireEvent.click(checkbox);

    // Deselect the first row
    fireEvent.click(checkbox);

    expect(mockOnRowSelect).toHaveBeenCalledWith(null);
  });

  it('filters rows based on input in the filter field', () => {
    render(
      <SelectableTable data={mockData} headers={mockHeaders} onRowSelect={mockOnRowSelect} />
    );

    const filterInput = screen.getByPlaceholderText('Filter by Name');
    fireEvent.change(filterInput, { target: { value: 'Bob' } });

    // Ensure only the filtered row is displayed
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
  });

});
