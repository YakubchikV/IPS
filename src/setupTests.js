import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

global.ReactTestingLibraryConfig = {
  asyncUtilTimeout: 4000,
};

afterEach(() => {
  cleanup();
});

global.scrollTo = jest.fn();
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
