// Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Navbar from '../src/components/Navbar';


jest.mock('react-i18next', () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string): string => {
      const translations: Record<string, string> = {
        'languageselector': 'Language Selector',
        'english': 'English',
        'french': 'French',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Navbar Langauge Selector Integration Test', () => {
  it('English translation', async () => {
    render(<Navbar />);
      const languageSelector = screen.getByRole('combobox'); 
    expect(languageSelector).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument(); 
    expect(screen.getByText('English')).toBeInTheDocument(); 
    expect(screen.getByText('Language Selector')).toBeInTheDocument(); 
  });
});

