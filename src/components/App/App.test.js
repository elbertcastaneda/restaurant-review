import { render } from '@testing-library/react';

import React from 'react';

import App from './App';

test('renders App component correctly', () => {
  const { getByText } = render(
    <App leftSide={<span>left side</span>} rightSide={<span>right side</span>} />
  );
  const linkElement = getByText(/Restaurant review./i);
  const leftSideElement = getByText(/left side/i);
  const rightSideElement = getByText(/right side/i);
  expect(linkElement).toBeInTheDocument();
  expect(leftSideElement).toBeInTheDocument();
  expect(rightSideElement).toBeInTheDocument();
});
