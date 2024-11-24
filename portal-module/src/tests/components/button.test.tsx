// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Buttons/Buttons';

describe('Button Component', () => {
  it('renders the button with children content', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const onClickMock = jest.fn();
    render(
      <Button onClick={onClickMock} disabled>
        Click Me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('renders with the correct type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
