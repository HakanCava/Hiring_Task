import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Page from "../../../app/getlocations/page";

// import { Provider } from "react-redux";
// import store from "../../../redux/store";


describe("Get Locations Page", () => {
  it("Should render properly", () => {
    render(
      // <Provider store={store}>
        <Page />
      // </Provider>
    );
    const placeName = screen.getByTestId("placeName");
    expect(placeName).toHaveTextContent("Place Name");
  });
});
