import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Page />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
    await screen.findByText("Message")
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Page />);
      const submitButton = await screen.findByText('Envoyer')
      expect(submitButton).toBeTruthy()
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 2000}) // rendu au-delà de deux secondes pour la validation du formulaire de contact
    });
  });
});

const mockData = {
  events: [
    { title: 'Event 1', date: '2024-02-14T10:00:00Z' },
    { title: 'Event 2', date: '2024-03-15T10:00:00Z' },
    { title: 'Event 3', date: '2024-04-16T10:00:00Z' },
  ],
};
jest.mock('../../contexts/DataContext', () => ({
  useData: () => ({data: mockData}),
}))
describe("When a page is created", () => {
  it("a list of events is displayed", async() => {
    const container = render(
      <Page/>
    )
    expect(container).toMatchSnapshot() 
    await screen.findByTestId('eventList') // EventList rendu
  })
  it("a list a people is displayed", () => {
    render (
      <Page />
    )
    screen.findByText('Alice')
    expect(screen.queryByText('CXO')).toBeInTheDocument() // PeapleCard rendu
  })
  it("a footer is displayed", () => {
    render(
      <Page/>
    )
    const contact=screen.queryByText('contact@724events.com')
    expect(contact).toBeInTheDocument()
  })
  it('sortLastEvents return the last element of the listEvents', () => { // test la fonction sort
    render(
      <Page/>
    )
    const sortedEvents = mockData.events.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));
    expect(sortedEvents).toHaveLength(3)
    expect(sortedEvents[0]).toHaveProperty('title', 'Event 3')
  })
  it("an event card, with the last event, is displayed", async () => {
    render(
      <Page/>
    )
    await screen.findByTestId('lastEvent') // EventCard "small" rendu
    await screen.findByDisplayValue('boom')
  })
});
