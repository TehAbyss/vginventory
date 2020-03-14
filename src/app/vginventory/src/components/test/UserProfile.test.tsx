import React from 'react';
import { render } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { renderHook } from '@testing-library/react-hooks';
import { getUserProfileMock } from '../../models/mocks/mockUserProfile';

describe('UserProfile component', () => {
  it('renders', () => {
    const { getByText } = render(<UserProfile {...getUserProfileMock()} />);
    const linkElement = getByText('User1');
    expect(linkElement).toBeInTheDocument();
  });

  it('', () => {

  });
});