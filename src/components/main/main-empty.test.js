import React from 'react';
import {render} from '@testing-library/react';
import MainEmpty from './main-empty';

it(`MainEmpty should render correctly`, () => {
  const {getByText} = render(<MainEmpty city="Amsterdam"/>);

  expect(getByText(`No places to stay available`)).toBeInTheDocument();
  expect(getByText(`We could not find any property available at the moment in Amsterdam`)).toBeInTheDocument();
});
