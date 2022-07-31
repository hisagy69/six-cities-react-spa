import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NearPlaces from "./near-places";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore({});

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    isLoadFavorites: true
  },
  OFFERS: {
  }
});

const props = {
  id: 1,
  previewImage: `previewImage`,
  price: 1000,
  isFavorite: true,
  rating: 5,
  title: `title`,
  type: `type`,
  bedrooms: 1,
  description: `description`,
  onFavorite: () => {},
  onButtonClick: () => {}
};

describe(`NearPlaces test`, () => {
  it(`NearPlaces should render correctly`, () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
          <Router history={history}>
            <NearPlaces {...props}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`€1000`)).toBeInTheDocument();
    expect(screen.getByText(`/ night`)).toBeInTheDocument();
    expect(screen.getByText(`In bookmarks`)).toBeInTheDocument();
    expect(screen.getByText(`Rating`)).toBeInTheDocument();
    expect(screen.getByText(`title`)).toBeInTheDocument();
    expect(screen.getByText(`type`)).toBeInTheDocument();
  });
  it(`NearPlaces should render correctly not favorite`, () => {
    const history = createMemoryHistory();

    render(
        <Provider store={store}>
          <Router history={history}>
            <NearPlaces {...props} isFavorite={false}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`To bookmarks`)).toBeInTheDocument();
  });
});
