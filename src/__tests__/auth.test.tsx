import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '@/components/Auth/AuthForms';
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
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockT = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    (useLanguage as jest.Mock).mockReturnValue({
      t: mockT,
    });
  });

  it('renders login form correctly', () => {
    render(<LoginForm onToggle={() => {}} />);
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login to Portal/i })).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    render(<LoginForm onToggle={() => {}} />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const submitButton = screen.getByRole('button', { name: /Login to Portal/i });

    const form = emailInput.closest('form');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    if (form) fireEvent.submit(form);

    const errorMessage = await screen.findByText(/Invalid email address/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login with correct credentials on valid submit', async () => {
    render(<LoginForm onToggle={() => {}} />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Login to Portal/i });

    const form = emailInput.closest('form');
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    if (form) fireEvent.submit(form);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@gmail.com', 'password123');
    }, { timeout: 3000 });
  });

  it('handles empty form submission', () => {
    render(<LoginForm onToggle={() => {}} />);
    const submitButton = screen.getByRole('button', { name: /Login to Portal/i });
    
    const form = submitButton.closest('form');
    if (form) fireEvent.submit(form);
    
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
