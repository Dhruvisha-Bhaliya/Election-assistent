import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Mock the hooks
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/context/LanguageContext', () => ({
  useLanguage: jest.fn(),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Search Functionality', () => {
  const mockT = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Test User', email: 'test@gmail.com' },
      logout: jest.fn(),
      isLoading: false,
      voteTallies: {},
    });
    (useLanguage as jest.Mock).mockReturnValue({
      t: mockT,
    });
  });

  it('renders search input when user is logged in', () => {
    render(<Home />);
    expect(screen.getByLabelText(/Search Dashboard/i)).toBeInTheDocument();
  });

  it('allows typing in search input', () => {
    render(<Home />);
    const searchInput = screen.getByLabelText(/Search Dashboard/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'Election Results' } });
    expect(searchInput.value).toBe('Election Results');
  });

  it('handles empty search', () => {
    render(<Home />);
    const searchInput = screen.getByLabelText(/Search Dashboard/i) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(searchInput.value).toBe('');
  });
});
