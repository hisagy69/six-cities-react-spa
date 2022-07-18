import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Favorites from "./favorites";

const mockStore = configureStore({});
describe(`Test Favorites`, () => {
  it(`Favorites not cards should render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        isLoadFavorites: true
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites onLoadData={() => {}}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(`Favorites (empty)`)).toBeInTheDocument();
    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
    expect(screen.getByText(`Save properties to narrow down search or plan your future trips.`)).toBeInTheDocument();
  });
  it(`Favorites shoul render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        isLoadFavorites: true,
        favorites: [
          {
            city: {
              name: `Paris`
            },
            id: 1,
            bedrooms: 1,
            title: `testing title`,
            type: `testing type`,
            price: 1000,
            preview_image: `previewImage`,
            description: `description`,
            rating: 5
          }
        ]
      }
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites onLoadData={() => {}}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
    expect(screen.getByText(`Paris`)).toBeInTheDocument();
  });
});
