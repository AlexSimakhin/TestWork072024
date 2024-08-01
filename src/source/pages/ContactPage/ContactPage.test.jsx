import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactPage } from './index';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetContactQuery, useUpdateTagsContactMutation } from '../../api';
import { vi } from 'vitest';
import { useForm } from 'react-hook-form';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useNavigate: () => mockNavigate,
}));

vi.mock('../../api', () => ({
  useGetContactQuery: vi.fn(),
  useUpdateTagsContactMutation: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(),
    handleSubmit: (fn) => fn,
    reset: vi.fn(),
    setError: vi.fn(),
    formState: { errors: {} },
  })),
}));

describe('ContactPage', () => {
  const mockNavigate = vi.fn();
  const mockUpdateTagsContact = vi.fn();
  const mockUseGetContactQuery = useGetContactQuery;
  const mockUseUpdateTagsContactMutation = useUpdateTagsContactMutation;
  const mockUseParams = useParams;
  const mockUseForm = useForm;

  beforeEach(() => {
    mockNavigate.mockClear();
    mockUpdateTagsContact.mockClear();
    mockUseParams.mockReturnValue({ contactId: '123' });
    mockUseUpdateTagsContactMutation.mockReturnValue([mockUpdateTagsContact]);
  });

  it('renders loading state', () => {
    mockUseGetContactQuery.mockReturnValue({
      data: null,
      isLoading: true,
    });
  
    render(<ContactPage />);
  
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseGetContactQuery.mockReturnValue({
      error: { message: 'Error' },
      isLoading: false,
      data: null,
    });

    render(<ContactPage />);

    expect(screen.getByText('Error: Error')).toBeInTheDocument();
  });

  it('renders contact details and tags', () => {
    mockUseGetContactQuery.mockReturnValue({
      data: {
        resources: [{
          avatar_url: 'http://example.com/avatar.jpg',
          fields: {
            'first name': [{ value: 'John' }],
            'last name': [{ value: 'Doe' }],
            'email': [{ value: 'john.doe@example.com' }],
          },
          tags2: ['tag1', 'tag2'],
          id: '123',
        }],
      },
      isLoading: false,
    });

    render(<ContactPage />);

    expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'http://example.com/avatar.jpg');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  // it('handles form submission with valid and invalid data', async () => {
  //   mockUseGetContactQuery.mockReturnValue({
  //     data: {
  //       resources: [{ id: '123', tags2: [] }],
  //     },
  //     isLoading: false,
  //   });
  
  //   mockUpdateTagsContact.mockResolvedValue({});
  
  //   render(<ContactPage />);
  
  //   const input = screen.getByLabelText(/Add Tags \(comma separated\)/i);
    
  //   console.log('! ', input.value)

  //   fireEvent.change(input, { target: { value: 'tag1, tag2' } });
  //   console.log('!!!', input.value)

  //   fireEvent.submit(screen.getByRole('form'));
    
  //   await waitFor(() => {
  //     expect(mockUpdateTagsContact).toHaveBeenCalledWith({
  //       id: '123',
  //       tags: {
  //         tags: ['tag1', 'tag2'],
  //       }
  //     });
  //   });
  
  //   mockUpdateTagsContact.mockRejectedValue(new Error('Failed to add tags'));
    
  //   fireEvent.change(input, { target: { value: 'tag1, tag2, tag3, tag4, tag5, tag6' } });
  //   fireEvent.submit(screen.getByRole('form'));
    
  //   await waitFor(() => {
  //     expect(screen.getByText('Maximum 5 tags are allowed.')).toBeInTheDocument();
  //   });
  
  //   // Test empty input
  //   fireEvent.change(input, { target: { value: '' } });
  //   fireEvent.submit(screen.getByRole('form'));
  
  //   await waitFor(() => {
  //     expect(mockUpdateTagsContact).not.toHaveBeenCalled();
  //     expect(screen.getByText('Tags are required')).toBeInTheDocument();
  //   });
  // });
  
  // it('navigates back when "Back" button is clicked', () => {
  //   render(<ContactPage />);
  //   const backButton = screen.getByRole('button', { name: /Back/i });
    
  //   fireEvent.click(backButton);
    
  //   console.log('mockNavigate calls:', mockNavigate.mock.calls);
    
  //   expect(mockNavigate).toHaveBeenCalledWith(-1);
  // });
  
});