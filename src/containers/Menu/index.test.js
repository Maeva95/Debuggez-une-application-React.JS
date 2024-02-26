import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Nos réalisations"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#nos-realisations");
    });
    it("should show the text of the button", async () => {
      render(
        <Menu />
          );
          await screen.findAllByText("Nos services")
          fireEvent.click(screen.getByTestId("service-link"));
          expect(screen.getByTestId("service-link")).toHaveTextContent('Nos services')
        
    });
  });
});
