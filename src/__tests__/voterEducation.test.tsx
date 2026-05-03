import { render, screen, fireEvent } from '@testing-library/react';
import VoterEducation from '@/components/Dashboard/VoterEducation';
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

describe('VoterEducation Component', () => {
  test('renders quiz initial state', () => {
    renderWithProviders(<VoterEducation />);
    expect(screen.getByText(/Digital Electoral Literacy/i)).toBeInTheDocument();
  });

  test('starts quiz when button is clicked', () => {
    renderWithProviders(<VoterEducation />);
    const startButton = screen.getByText(/Begin Official Certification/i);
    fireEvent.click(startButton);
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
  });

  test('shows failure screen on wrong answer', async () => {
    renderWithProviders(<VoterEducation />);
    fireEvent.click(screen.getByText(/Begin Official Certification/i));
    
    // Pick first wrong answer
    const options = screen.getAllByRole('button');
    fireEvent.click(options[1]); // Assuming index 1 is wrong for Q1
    
    // Complete the quiz with any answers
    for(let i = 0; i < 2; i++) {
        const nextOptions = screen.getAllByRole('button');
        fireEvent.click(nextOptions[0]);
    }
    
    expect(screen.getByText(/Certification Denied/i)).toBeInTheDocument();
  });
});
