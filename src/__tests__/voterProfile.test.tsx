import { render, screen, fireEvent } from '@testing-library/react';
import VoterProfile from '@/components/Dashboard/VoterProfile';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import '@testing-library/jest-dom';

// Mock the contexts
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'John Doe', region: 'Western District' },
    voterCount: 24500000
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    locale: 'en',
    t: (key: string) => key
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => () => {
  const MockComponent = () => <div data-testid="dynamic-mock">Mock Component</div>;
  return MockComponent;
});

describe('VoterProfile Component', () => {
  it('renders the voter profile with user data', () => {
    render(<VoterProfile />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Western District')).toBeInTheDocument();
    expect(screen.getByText('#V-2026-88XC')).toBeInTheDocument();
  });

  it('filters news items based on search input', () => {
    render(<VoterProfile />);
    const searchInput = screen.getByLabelText(/Search Intel Feed/i);

    fireEvent.change(searchInput, { target: { value: 'Sector 5' } });
    expect(screen.getByText('Poll Station Update')).toBeInTheDocument();
    expect(screen.queryByText('Regional Turnout')).not.toBeInTheDocument();
  });

  it('opens news modal when clicking a news item', () => {
    render(<VoterProfile />);
    const newsItem = screen.getByText('Poll Station Update');
    fireEvent.click(newsItem);

    expect(screen.getByText(/Community Hall/i)).toBeInTheDocument();
    expect(screen.getByText('Acknowledge & Close')).toBeInTheDocument();
  });

  it('handles voter card download simulation', async () => {
    window.alert = jest.fn();
    render(<VoterProfile />);
    const downloadBtn = screen.getByLabelText(/Download Secure Voter Card/i);
    
    fireEvent.click(downloadBtn);
    expect(downloadBtn).toBeDisabled();
    expect(screen.getByText('Encrypting...')).toBeInTheDocument();

    // Wait for the timeout
    await new Promise(r => setTimeout(r, 1600));
    expect(window.alert).toHaveBeenCalledWith('Digital Voter ID Secure Download Complete.');
  });
});
