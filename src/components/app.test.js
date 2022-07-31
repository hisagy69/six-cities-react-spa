import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import {AuthorizationStatus} from "../const";
import Routes from './enum';
import thunk from "redux-thunk";
const {LOGIN, FAVORITES, OFFER} = Routes;

const mockStore = configureStore([thunk]);

jest.mock(`../api-actions`, () => {
  const originalModule = jest.requireActual(`../api-actions`);
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
describe(`Test routing`, () => {
  it(`Render 'MainScreen' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      },
      OFFERS: {
        isDataLoaded: true,
        city: `Paris`,
        sort: `Popular`,
        cards: [{
          id: 1,
          price: 1000,
          rating: 5,
          title: `title`,
          type: `hotel`,
          preview_image: `./image`,// eslint-disable-line
          description: ``,
          bedrooms: 1,
          city: {
            name: `Paris`
          },
          location: {
            latitude: 1,
            longitude: 1
          }
        }]
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`1 places to stay in Paris`)).toBeInTheDocument();
  });
  it(`Render 'FavoritesScreen' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    history.push(FAVORITES);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        isLoadFavorites: true,
        isLoadStatus: true,
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
            preview_image: `previewImage`,// eslint-disable-line
            description: `description`,
            rating: 5
          }
        ]
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
  });
  it(`Render 'Login' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(LOGIN);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        isLoadStatus: true,
      }
    });
    render(
        <Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
    );

    screen.getAllByText(`Sign in`).forEach((item) => expect(item).toBeInTheDocument());
  });
  it(`Render 'OfferScreen' when user navigate to '/offer/id' url`, () => {
    const history = createMemoryHistory();
    history.push(`${OFFER}1`);

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
            <App/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Other places in the neighbourhood`)).toBeInTheDocument();
  });
  it(`Render 'Page404' when user navigate to not found url`, () => {
    const history = createMemoryHistory();
    history.push(`/1`);

    render(
        <Router history={history}>
          <App/>
        </Router>
    );

    expect(screen.getByText(`404 not found`)).toBeInTheDocument();
  });
});
