import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { ContactCard } from './index';
import { useRemoveContactMutation } from '../../../../api';

vi.mock('../../../../api', () => ({
  useRemoveContactMutation: vi.fn(),
}));

describe('ContactCard', () => {
  const mockRemoveContact = vi.fn();

  beforeEach(() => {
    useRemoveContactMutation.mockReturnValue([mockRemoveContact]);
  });

  const mockData = {
    avatar_url: 'https://via.placeholder.com/150',
    fields: {
      'first name': [{ value: 'John' }],
      'last name': [{ value: 'Doe' }],
      email: [{ value: 'john@example.com' }],
    },
    tags2: ['friend', 'work'],
    id: '12345',
  };

  it('renders the contact information correctly', () => {
    render(
      <MemoryRouter>
        <ContactCard data={mockData} />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toHaveAttribute('src', mockData.avatar_url);
    expect(screen.getByText('friend')).toBeInTheDocument();
    expect(screen.getByText('work')).toBeInTheDocument();
  });

  it('calls removeContact mutation on delete button click', async () => {
    render(
      <MemoryRouter>
        <ContactCard data={mockData} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(mockRemoveContact).toHaveBeenCalledWith('12345');
  });

  it('handles removeContact mutation success', async () => {
    mockRemoveContact.mockResolvedValueOnce({});
    console.log = vi.fn();

    render(
      <MemoryRouter>
        <ContactCard data={mockData} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    await mockRemoveContact();
    expect(console.log).toHaveBeenCalledWith('Contact removed');
  });

  it('handles removeContact mutation failure', async () => {
    mockRemoveContact.mockRejectedValueOnce(new Error('Failed to remove contact'));
    console.error = vi.fn();

    render(
      <MemoryRouter>
        <ContactCard data={mockData} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    try {
      await mockRemoveContact();
    } catch {
    }

    expect(console.error).toHaveBeenCalledWith('Failed to remove contact:', expect.any(Error));
  });
});
