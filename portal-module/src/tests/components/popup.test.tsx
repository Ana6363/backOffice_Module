// @ts-nocheck

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/PopUp';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the modal methods
    const modal = document.createElement('dialog');
    modal.showModal = jest.fn();
    modal.close = jest.fn();
    document.body.appendChild(modal);
    modal.id = 'my_modal_5';
  });

  afterEach(() => {
    const modal = document.getElementById('my_modal_5');
    if (modal) {
      document.body.removeChild(modal);
    }
  });

  it('opens the modal when the trigger button is clicked', () => {
    render(
      <Modal
        title="Test Title"
        message="Test Message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    expect(modal.showModal).toHaveBeenCalled();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <Modal
        title="Test Title"
        message="Test Message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
    expect(modal.close).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(
      <Modal
        title="Test Title"
        message="Test Message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('does not render the confirm button when isConfirm is false', () => {
    render(
      <Modal
        title="Test Title"
        message="Test Message"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isConfirm={false}
      />
    );

    const openButton = screen.getByText('Open Modal');
    fireEvent.click(openButton);

    const confirmButton = screen.queryByText('Confirm');
    expect(confirmButton).not.toBeInTheDocument();
  });
});
