import { describe, it } from "vitest";
// import { render } from "@testing-library/react";

import App from "./App";
import { renderWithProviders } from "./test-utils";

describe("<App />", () => {
  it("App renders", () => {
    renderWithProviders(<App />);
  });
});
