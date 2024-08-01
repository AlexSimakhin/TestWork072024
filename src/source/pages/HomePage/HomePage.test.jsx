import { render, screen, within } from '@testing-library/react';
import { HomePage } from './index';
import { vi } from 'vitest';

vi.mock('../../components/CreateContact', () => ({
  CreateContact: () => <div>CreateContact Component</div>,
}));

vi.mock('../../components/Contacts', () => ({
  Contacts: () => <div>Contacts Component</div>,
}));

describe('HomePage', () => {
  it('renders CreateContact and Contacts components', () => {
    render(<HomePage />);

    expect(screen.getByText('CreateContact Component')).toBeInTheDocument();
    expect(screen.getByText('Contacts Component')).toBeInTheDocument();
  });

  it('should render with appropriate layout in a mobile viewport', () => {
    global.innerWidth = 500;
    render(<HomePage />);

    const createContactElement = screen.getByText('CreateContact Component');
    const contactsElement = screen.getByText('Contacts Component');

    expect(createContactElement).toBeInTheDocument();
    expect(contactsElement).toBeInTheDocument();
  });

  it('should render with appropriate layout in a desktop viewport', () => {
    global.innerWidth = 1200;
    render(<HomePage />);

    const createContactElement = screen.getByText('CreateContact Component');
    const contactsElement = screen.getByText('Contacts Component');

    expect(createContactElement).toBeInTheDocument();
    expect(contactsElement).toBeInTheDocument();
  });
});
