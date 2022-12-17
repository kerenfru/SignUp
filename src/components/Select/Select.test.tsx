import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Select from "./Select";

describe("<Select />", () => {
  test("it should mount", () => {
    render(
      <Select
        id="id"
        placeholder=""
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "disabled",
            label: "Disabled",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
        ]}
        onChange={() => {}}
      />
    );

    const select = screen.getByTestId("Select");

    expect(select).toBeInTheDocument();
  });
});
