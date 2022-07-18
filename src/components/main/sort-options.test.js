import React from 'react';
import {render} from '@testing-library/react';
import SortOptions from './sort-options';

it(`SortOptions should render correctly`, () => {
  const {getByText, getAllByText} = render(<SortOptions sort="Popular" onSort={() => {}}/>);

  expect(getByText(`Sort by`)).toBeInTheDocument();
  getAllByText(`Popular`).forEach((item) => expect(item).toBeInTheDocument());
  expect(getByText(`Price: low to high`)).toBeInTheDocument();
  expect(getByText(`Price: high to low`)).toBeInTheDocument();
  expect(getByText(`Top rated first`)).toBeInTheDocument();
});
