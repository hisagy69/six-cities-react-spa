import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import Login from './login';
import {AuthorizationStatus} from '../../const';
const mockStore = configureStore({});

it(`Render 'Login' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <Login/>
      </Router>
    </Provider>
  );

  screen.getAllByText(/Sign in/i).forEach((item) => expect(item).toBeInTheDocument());
  expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`login`), `testUser`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/testUser/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
