import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Assistant from '@/components/Assistant';
import { LanguageProvider } from '@/context/LanguageContext';
import '@testing-library/jest-dom';

// Mock the useLanguage hook since it's used inside Assistant
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    locale: 'en',
    t: (key: string) => key
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock global fetch
global.fetch = jest.fn();

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Assistant Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders correctly in inline mode', () => {
    render(<Assistant mode="inline" />);
    expect(screen.getByText(/VoterConnect AI Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about voting/i)).toBeInTheDocument();
  });

  it('shows a welcome message on load', () => {
    render(<Assistant mode="inline" />);
    expect(screen.getByText(/Welcome! I'm your VoterConnect AI/i)).toBeInTheDocument();
  });

  it('handles sending a message and shows bot response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: async () => ({ response: 'This is a test response' }),
    });

    render(<Assistant mode="inline" />);
    
    const input = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByLabelText(/Send Message/i);

    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('How do I vote?')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('This is a test response')).toBeInTheDocument();
    });
  });

  it('falls back to local logic if API fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Down'));

    render(<Assistant mode="inline" />);
    
    const input = screen.getByPlaceholderText(/Ask about voting/i);
    const sendButton = screen.getByLabelText(/Send Message/i);

    fireEvent.change(input, { target: { value: 'when is the election' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/May 17, 2026/i)).toBeInTheDocument();
    });
  });
});
