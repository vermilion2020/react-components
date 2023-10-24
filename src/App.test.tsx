import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App tests", () => {
  it("Renders Hello world", () => {
    // Arrange
    render(<App />);
    // Expect
    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Hello world!");
  });
});
