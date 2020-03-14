import React from 'react';
import { render } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { renderHook } from '@testing-library/react-hooks';

describe('renders learn react link', () => {
  const { getByText } = render(<UserProfile />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});