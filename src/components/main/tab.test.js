import React from "react";
import {render} from "@testing-library/react";
import Tab from "./tab";

it(`Tab should render correctly`, () => {
  const {getByText} = render(<Tab location="Amsterdam" onCityEnter={() => {}}/>);

  expect(getByText(`Amsterdam`)).toBeInTheDocument();
});
