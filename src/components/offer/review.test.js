import React from "react";
import {render} from "@testing-library/react";
import Review from "./review";

it(`Review should render correctly`, () => {
  const comment = {
    user: {
      name: `test name`
    },
    rating: 5,
    comment: `test comment`,
    date: `2022-05-29T15:42:38.370Z`
  };
  const {getByText} = render(<Review review={comment}/>);

  expect(getByText(`test name`)).toBeInTheDocument();
  expect(getByText(`Rating`)).toBeInTheDocument();
  expect(getByText(`test comment`)).toBeInTheDocument();
  expect(getByText(`May 2022`)).toBeInTheDocument();
});
