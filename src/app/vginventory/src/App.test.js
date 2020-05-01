import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import * as auth0module from './react-auth0-spa';

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

test('renders learn react link', () => {
  // intercept the useAuth0 function and mock it
  const mock = jest.spyOn(auth0module, "useAuth0");
  mock.mockReturnValue({
    loading: false,
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn()
  });

  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const linkElement = getByText('VGinventory');
  expect(linkElement).toBeInTheDocument();

  mock.mockRestore();
});
