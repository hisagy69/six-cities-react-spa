import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import Offer from "./offer";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore({});
describe(`Offer test`, () => {
  it(`Offer should render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      ERROR: {
        errorSend: false
      },
      HOTEL: {
        hotel: {
          isHotelLoad: true,
          is_premium: true,
          id: 1,
          preview_image: `previewImage`,
          price: 1000,
          is_favorite: true,
          rating: 5,
          max_adults: 3,
          title: `title`,
          type: `type`,
          bedrooms: 1,
          description: `description`,
          goods: [`Washing machine`],
          host: {
            name: `host name`
          },
          images: []
        },
        comments: [
          {
            user: {
              name: `test name`
            },
            rating: 5,
            comment: `test comment`,
            date: `2022-05-29T15:42:38.370Z`
          }
        ]
      }
    });
    const props = {
      onLoadData: () => {},
      onLoadComments: () => {},
      onButtonClick: () => {}
    };
    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer {...props}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
  });
});
