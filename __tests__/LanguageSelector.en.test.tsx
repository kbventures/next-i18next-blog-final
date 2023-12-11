import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from '../src/components/LanguageSelector';

// Mock the translation hook with a mocked implementation
jest.mock('next-i18next', () => ({
  useTranslation: (namespace: string) => {
    if (namespace === 'navigation/language-selector') {
      const translations = {
        languageselector: 'Language Selector',
        english: 'English',
        french: 'French',
      };

      return {
        t: (key: keyof typeof translations) => translations[key],
        i18n: { language: 'en' },
        ready: true,
      };
    }

    // Return a default implementation for other namespaces
    return {
      t: (key: string) => key,
      i18n: { language: 'en' },
      ready: true,
    };
  },
}));

describe('LanguageSelector', () => {
  it('renders in english', async () => {
    await render(<LanguageSelector />);
  
    // Use the translated strings you expect to be rendered
    expect(screen.getByText('Language Selector')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();

     // Check if localStorage is initially empty
     expect(localStorage.getItem('selectedLocale')).toBeNull();

     // Simulate changing the language to French
     // screen.getByRole('combobox'): This part of the code uses the screen object provided by the
     // @testing-library/react library. It looks for an element with the ARIA role of 'combobox'.
     //  In HTML, a <select> element typically has this role when rendered.
     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fr' } });
 
     // Check if the selectedLocale is updated in state
     expect(localStorage.setItem).toHaveBeenCalledWith('selectedLocale', 'fr');
     expect(localStorage.getItem('selectedLocale')).toBe('fr');
  });
});


