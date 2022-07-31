import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import Offer from "./offer";
import {AuthorizationStatus} from "../../const";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

jest.mock(`../../api-actions`, () => {
  const originalModule = jest.requireActual(`../../api-actions`);
  return {
    __esModule: true,
    ...originalModule,
    fetchHotelLoad: () => {
      return {
        type: ``
      };
    },
    fetchNearbyLoad: () => {
      return {
        type: ``
      };
    },
    setId: () => {
      return {
        type: ``
      };
    }
  };
});
describe(`Offer test`, () => {
  it(`Offer should render correctly`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        isLoadFavorites: true
      },
      ERROR: {
        errorSend: false
      },
      OFFERS: {
        id: 1
      },
      HOTEL: {
        hotel: {
          isHotelLoad: true,
          is_premium: true,// eslint-disable-line
          id: 1,
          preview_image: `previewImage`,// eslint-disable-line
          price: 1000,
          is_favorite: true,// eslint-disable-line
          rating: 5,
          max_adults: 3,// eslint-disable-line
          title: `title`,
          type: `type`,
          bedrooms: 1,
          description: `description`,
          goods: [`Washing machine`],
          host: {
            name: `host name`
          },
          images: [],
          location: {
            latitude: 1,
            longitude: 1
          }
        },
        isCommentsLoad: true,
        isHotelLoad: true,
        isHotelNearbyLoad: true,
        hotelNearby: [
          {
            bedrooms: 1,
            preview_image: `previewImage`,// eslint-disable-line
            id: 1,
            description: `description`,
            price: 1000,
            rating: 5,
            title: `title`,
            type: `type`,
            location: {
              latitude: 1,
              longitude: 1
            }
          }
        ],
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

    render(
        <Provider store={store}>
          <Router history={history}>
            <Offer offerId={1} onButtonClick={() => {}}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
  });
  it(`Offer should render correctly page404`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      ERROR: {
        errorSend: false
      },
      HOTEL: {
        notFound: true,
        isHotelLoad: true,
        isHotelNearbyLoad: true
      }
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Offer onButtonClick={() => {}} offerId={1}/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`404 not found`)).toBeInTheDocument();
  });
});
