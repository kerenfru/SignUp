import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import axios from "axios";

jest.mock("axios");

describe("<Form />", () => {
  test("it should mount", () => {
    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ state_name: "Alabama" }, { state_name: "Alaska" }],
      })
    );
    render(<Form />);

    const form = screen.getByTestId("Form");

    expect(form).toBeInTheDocument();
  });
});
