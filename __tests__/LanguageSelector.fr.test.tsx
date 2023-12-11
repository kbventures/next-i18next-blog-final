import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from '../src/components/LanguageSelector';

jest.mock('next-i18next', () => ({
  useTranslation: (namespace: string) => {
    if (namespace === 'navigation/language-selector') {
      const translations = {
        languageselector: 'Sélecteur de langue',
        english: 'Anglais',
        french: 'Français',
      };

      return {
        t: (key: keyof typeof translations) => translations[key],
        i18n: { language: 'fr' },
        ready: true,
      };
    }

    // Return a default implementation for other namespaces
    return {
      t: (key:string) => key,
      i18n: { language: 'fr' },
      ready: true,
    };
  },
}));

describe('LanguageSelector - French', () => {
  it('renders in French', async () => {
    render(<LanguageSelector />);
  
    expect(screen.getByText('Sélecteur de langue')).toBeInTheDocument();
    expect(screen.getByText('Anglais')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();

     // Check if localStorage is initially empty
     expect(localStorage.getItem('selectedLocale')).toBeNull();

     // Simulate changing the language to French
     // screen.getByRole('combobox'): This part of the code uses the screen object provided by the
     // @testing-library/react library. It looks for an element with the ARIA role of 'combobox'.
     //  In HTML, a <select> element typically has this role when rendered.
     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
 
     // Check if the selectedLocale is updated in state
     expect(localStorage.setItem).toHaveBeenCalledWith('selectedLocale', 'en');
     expect(localStorage.getItem('selectedLocale')).toBe('en');
  });
});