import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "../../../app/editlocation/page";

import { Provider } from "react-redux";
import store from "../../../redux/store";

const searchParams: Locate = {
  id: 1,
  lat: 41.456,
  lng: 28.012,
  placeName: "Test Place",
  placeInfo: "Test Place Info",
  marker: "test-marker",
};

describe("Get Edit Page", () => {
  it("Should render properly", () => {
    render(
      <Provider store={store}>
        <Page searchParams={searchParams}/>
      </Provider>
    );
    const Heading = screen.getByTestId("editHeading");
    expect(Heading).toHaveTextContent("Change Location");
  });
});
