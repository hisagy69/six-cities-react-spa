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
  const headerElement = getByText(`404 not found`);
  const linkElement = getByText(`На главную`);

  expect(headerElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
