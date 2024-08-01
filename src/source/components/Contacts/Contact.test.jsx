import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Contacts } from './index';
import { useGetContactsQuery } from '../../api';

vi.mock('../../api', () => ({
  useGetContactsQuery: vi.fn(),
}));

vi.mock('./components/ContactCard', () => ({
  ContactCard: ({ data }) => <div>{data.fields['first name'][0].value} {data.fields['last name'][0].value}</div>,
}));

describe('Contacts', () => {
  it('renders loading state initially', () => {
    useGetContactsQuery.mockReturnValue({ isLoading: true, data: null });

    render(<Contacts />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "No contacts found" when there is no data', () => {
    useGetContactsQuery.mockReturnValue({ isLoading: false, data: null });

    render(<Contacts />);

    expect(screen.getByText('No contacts found.')).toBeInTheDocument();
  });

  it('renders contacts when data is available', () => {
    const mockData = {
      resources: [
        {
          id: '1',
          avatar_url: 'https://via.placeholder.com/150',
          fields: {
            'first name': [{ value: 'John' }],
            'last name': [{ value: 'Doe' }],
            email: [{ value: 'john@example.com' }],
          },
          tags2: ['friend', 'work'],
        },
        {
          id: '2',
          avatar_url: 'https://via.placeholder.com/150',
          fields: {
            'first name': [{ value: 'Jane' }],
            'last name': [{ value: 'Doe' }],
            email: [{ value: 'jane@example.com' }],
          },
          tags2: ['family'],
        },
      ],
    };

    useGetContactsQuery.mockReturnValue({ isLoading: false, data: mockData });

    render(<Contacts />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
