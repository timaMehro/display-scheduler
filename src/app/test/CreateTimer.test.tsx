import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import CreateTimer from "../components/CreateTimer";

describe("CreateTimer", () => {
  // just a simple test to show codeCoverage works
  it("shows error if no days are selected", async () => {
    render(<CreateTimer onCloseCreatePanel={() => {}} />);
    const saveBtn = screen.getByRole("button", { name: /save timer/i });

    fireEvent.click(saveBtn);

    expect(
      await screen.findByText(/please select at least one day/i)
    ).toBeInTheDocument();
  });
});
