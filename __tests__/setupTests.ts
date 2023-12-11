import { jest } from '@jest/globals';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: () => ({
      pathname: '/',
      push: jest.fn(),
      route: '/',
      asPath: '/',
      locale: 'en', 
    }),
  }));

  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
  
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });