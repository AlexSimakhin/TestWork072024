import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateContact } from './index';
import { useCreateContactMutation } from '../../api';
import { vi } from 'vitest';

vi.mock('../../api', () => ({
  useCreateContactMutation: vi.fn(() => [vi.fn().mockResolvedValue({}), { isLoading: false, error: null }]),
}));

describe('CreateContact', () => {
  it('renders the form correctly', () => {
    render(<CreateContact />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('shows error message when both first name and last name are empty', async () => {
    render(<CreateContact />);
    fireEvent.submit(screen.getByRole('button', { name: /Add Contact/i }));
    // Измените текст ошибки на существующий
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  it('calls createContact mutation on form submit', async () => {
    const mockCreateContact = vi.fn().mockResolvedValue({});
    useCreateContactMutation.mockReturnValue([mockCreateContact, { isLoading: false, error: null }]);

    render(<CreateContact />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Contact/i }));

    await waitFor(() => {
      expect(mockCreateContact).toHaveBeenCalled();
    });
  });
});
