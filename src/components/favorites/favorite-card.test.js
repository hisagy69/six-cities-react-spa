import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {FavoriteCard} from "./favorite-card";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore({});
it(`FavoriteCard should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({});
  const props = {
    onFavorite: () => {},
    rating: 5,
    id: 1,
    previewImage: `previewImage`,
    title: `testing title`,
    type: `testing type`,
    price: 1000
  };
  render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteCard {...props}/>
        </Router>
      </Provider>
  );

  expect(screen.getByText(`€1000`)).toBeInTheDocument();
  expect(screen.getByText(`/ night`)).toBeInTheDocument();
  expect(screen.getByText(`In bookmarks`)).toBeInTheDocument();
  expect(screen.getByText(`testing title`)).toBeInTheDocument();
  expect(screen.getByText(`testing type`)).toBeInTheDocument();
});