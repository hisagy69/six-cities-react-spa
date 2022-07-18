import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Header from "./header";
import {AuthorizationStatus} from "../const";

const mockStore = configureStore({});
describe(`Header test`, () => {
  it(`Header shoul render correctly no auth`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
  });
  it(`Header shoul render correctly not favorite`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          email: `test@test.gmail.com`,
          name: `name`
        }
      }
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(`test@test.gmail.com`)).toBeInTheDocument();
  });
});
