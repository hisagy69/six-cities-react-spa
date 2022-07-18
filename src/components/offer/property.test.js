import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Property from "./property";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore({});
describe(`Property test`, () => {
  it(`Property should render correctly`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      ERROR: {
        errorSend: false
      },
      HOTEL: {
        hotel: {
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
          }
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
      onLoadComments: () => {},
      onButtonClick: () => {}
    };
    render(
      <Provider store={store}>
        <Property {...props}/>
      </Provider>
    );

    expect(screen.getByText(`Premium`)).toBeInTheDocument();
    expect(screen.getByText(`title`)).toBeInTheDocument();
    expect(screen.getByText(`type`)).toBeInTheDocument();
    expect(screen.getByText(`1 Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max 3 adults`)).toBeInTheDocument();
    expect(screen.getByText(`€1000`)).toBeInTheDocument();
    expect(screen.getByText(`night`)).toBeInTheDocument();
    expect(screen.getByText(`What's inside`)).toBeInTheDocument();
    expect(screen.getByText(`Washing machine`)).toBeInTheDocument();
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByText(`host name`)).toBeInTheDocument();
    expect(screen.getByText(`description`)).toBeInTheDocument();
    expect(screen.getByText(`Reviews ·`)).toBeInTheDocument();
  });
  it(`Property should render correctly not favorite`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      HOTEL: {
        hotel: {
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
          }
        }
      }
    });

    const props = {
      onLoadComments: () => {},
      onButtonClick: () => {}
    };

    render(
      <Provider store={store}>
        <Property {...props}/>
      </Provider>
    );

    expect(screen.getByText(`loading...`)).toBeInTheDocument();
  });
});
