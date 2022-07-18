import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Main from "./Main";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore({});
it(`Main should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.AUTH,
    },
    OFFERS: {
      isDataLoaded: true,
      city: `Paris`,
      sort: `Popular`,
      cards: [
        {
          city: {
            name: `Paris`
          },
          location: {
            latitude: 1,
            longitude: 1
          },
          isPremium: true,
          id: 1,
          preview_image: `previewImage`,
          price: 1000,
          isFavorite: true,
          rating: 5,
          title: `title`,
          type: `type`,
          bedrooms: 1,
          description: `description`,
        }
      ]
    }
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <Main onButtonClick={() => {}}/>
      </Router>
    </Provider>
  );

  expect(screen.getByText(`Cities`)).toBeInTheDocument();
  expect(screen.getByText(`Paris`)).toBeInTheDocument();
  expect(screen.getByText(`Places`)).toBeInTheDocument();
  expect(screen.getByText(`1 places to stay in Paris`)).toBeInTheDocument();
});
