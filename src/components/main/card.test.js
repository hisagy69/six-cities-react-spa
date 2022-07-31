import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Card from "./card";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore({});

const props = {
  isPremium: true,
  id: 1,
  previewImage: `previewImage`,
  price: 1000,
  isFavorite: true,
  rating: 5,
  title: `title`,
  type: `type`,
  bedrooms: 1,
  description: `description`,
  onButtonClick: () => {}
};

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  OFFERS: {
  }
});
describe(`Card test`, () => {
  it(`Card should render correctly`, () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
          <Router history={history}>
            <Card {...props}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByText(`€1000`)).toBeInTheDocument();
    expect(screen.getByText(`/ night`)).toBeInTheDocument();
    expect(screen.getByText(`In bookmarks`)).toBeInTheDocument();
    expect(screen.getByText(`Rating`)).toBeInTheDocument();
    expect(screen.getByText(`title`)).toBeInTheDocument();
    expect(screen.getByText(`type`)).toBeInTheDocument();
  });
  it(`Card should render correctly not favorite`, () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
          <Router history={history}>
            <Card {...props} isFavorite={false}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
  });
});
