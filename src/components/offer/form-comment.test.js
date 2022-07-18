import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import FormComment from './form-comment';
const mockStore = configureStore({});

it(`FormComment should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    HOTEL: {
      isCommentSend: false
    },
    ERROR: {
      errorSend: false
    }
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <FormComment/>
      </Router>
    </Provider>
  );

  expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  expect(screen.getByText(/rating/i)).toBeInTheDocument();
  expect(screen.getByText(/and describe your stay with at least/i)).toBeInTheDocument();
  expect(screen.getByText(/50 characters/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  expect(screen.getByText(/Your review/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(/Submit/i), `test review`);

  expect(screen.getByDisplayValue(/test review/i)).toBeInTheDocument();
});
