// Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Navbar from '../src/components/Navbar';


jest.mock('react-i18next', () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string): string => {
      const translations: Record<string, string> = {
        'languageselector': 'Sélecteur de langue',
        'english': 'Anglais',
        'french': 'Francais',
      };
      return translations[key] || key;
    },
  }),
}));

describe('French Navbar Integration Test', () => {
  it('French translation', async () => {
    render(<Navbar />);
      const languageSelector = screen.getByRole('combobox'); 
    expect(languageSelector).toBeInTheDocument();
    expect(screen.getByText('Francais')).toBeInTheDocument(); 
    expect(screen.getByText('Anglais')).toBeInTheDocument(); 
    expect(screen.getByText('Sélecteur de langue')).toBeInTheDocument(); 
  });
});
