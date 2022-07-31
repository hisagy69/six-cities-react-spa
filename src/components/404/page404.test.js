import React from "react";
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from "history";
import Page404 from "./page404";

it(`Page404 should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <Page404/>
      </Router>
  );

  expect(getByText(`404 not found`)).toBeInTheDocument();
  expect(getByText(`На главную`)).toBeInTheDocument();
});
