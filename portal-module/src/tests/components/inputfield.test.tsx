// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../../components/InputField';

describe('InputField Component', () => {
  it('renders the input field with default placeholder', () => {
    render(<InputField value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toBeInTheDocument();
  });

  it('renders the input field with a custom placeholder', () => {
    render(<InputField placeholder="Custom Placeholder" value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Custom Placeholder');
    expect(input).toBeInTheDocument();
  });

  it('renders the input field with the correct value', () => {
    render(<InputField value="Test Value" onChange={() => {}} />);

    const input = screen.getByDisplayValue('Test Value');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange handler when the value changes', () => {
    const handleChange = jest.fn();
    render(<InputField value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Enter text...');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.any(HTMLInputElement) }));
  });

  it('applies additional className to the input field', () => {
    render(<InputField value="" onChange={() => {}} className="custom-class" />);

    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toHaveClass('custom-class');
  });
});
