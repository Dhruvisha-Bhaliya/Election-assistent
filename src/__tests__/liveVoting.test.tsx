import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LiveVoting from '@/components/LiveVoting';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LanguageProvider>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </LanguageProvider>
  );
};

describe('LiveVoting Component', () => {
  test('renders secure booth entry screen', () => {
    renderWithProviders(<LiveVoting />);
    expect(screen.getByText(/Secure Digital Booth/i)).toBeInTheDocument();
  });

  test('initiates security handshake on click', async () => {
    renderWithProviders(<LiveVoting />);
    const enterButton = screen.getByText(/ENTER SECURE BOOTH/i);
    fireEvent.click(enterButton);
    expect(screen.getByText(/AUTHENTICATING/i)).toBeInTheDocument();
  });

  test('shows preparation state after authentication', async () => {
    renderWithProviders(<LiveVoting />);
    fireEvent.click(screen.getByText(/ENTER SECURE BOOTH/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Preparing Digital Ballot/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
