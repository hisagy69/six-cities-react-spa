import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import FormComment from './form-comment';
const mockStore = configureStore({});

describe(`Test FormComment`, () => {
  it(`FormComment should render correctly`, async () => {
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
            <FormComment id={1}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/i)).toBeInTheDocument();
    expect(screen.getByText(/50 characters/i)).toBeInTheDocument();
    expect(screen.getByText(`Submit`)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId(`review`), `test review`);

    expect(screen.getByDisplayValue(/test review/i)).toBeInTheDocument();
  });
  it(`FormComment should render correctly`, async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      HOTEL: {
        isCommentSend: false
      },
      ERROR: {
        errorSend: true
      }
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <FormComment id={1}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Ошибка отправки/i)).toBeInTheDocument();
  });
});
