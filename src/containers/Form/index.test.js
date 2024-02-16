import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

const mockContactApi = jest.fn(() => new Promise((resolve) => { setTimeout(resolve, 1000); }))

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest 
      .fn()
      .mockResolvedValueOnce()// simule la fonction asynchrone qui sera appelé en cas de succès
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await onSuccess()
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled()
      })
    });
    it("the error action is called", async () => {
      const onError = jest.fn()
      mockContactApi.mockRejectedValueOnce(new Error('API error')) // vérifie que la fonction simulée sera toujours rejetée

      render(<Form onError={onError} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await onError()
      await waitFor(() => {
        expect(onError).toHaveBeenCalled()
      })
    })
  });
});
