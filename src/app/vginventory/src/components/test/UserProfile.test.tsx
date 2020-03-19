import React from 'react';
import { render } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { getUserProfileMock } from '../../models/mocks/mockUserProfile';

describe('UserProfile component', () => {
  it('contains a username', () => {
    const { getByText } = render(<UserProfile {...getUserProfileMock()} />);
    const linkElement = getByText('User1');
    expect(linkElement).toBeInTheDocument();
  });

  it('contains the game overwatch in the list', () => {
    const { getByText } = render(<UserProfile {...getUserProfileMock()} />);
    const linkElement = getByText('Overwatch');
    expect(linkElement).toBeInTheDocument();
  });
});