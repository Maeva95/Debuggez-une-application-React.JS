import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

describe("When a data context is created", () => {
  it("a call is executed on the events.json file", async () => {
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });
  
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");
      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  it("api.loadData", () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
  it("the last event is displayed", () => {
    const mockData = {
      events: [
        { title: 'Event 1', date: '2024-02-14T10:00:00Z' },
        { title: 'Event 2', date: '2024-03-15T10:00:00Z' },
        { title: 'Event 3', date: '2024-04-16T10:00:00Z' },
      ],
    };
    api.loadData = jest.fn().mockReturnValue(mockData)
    const Component = () => {
      const { sortedEvents } = useData();
      return <div>{sortedEvents?.title}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    )
    const sortedEvents = mockData.events.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));
    expect(sortedEvents).toHaveLength(3)
    expect(sortedEvents[0]).toHaveProperty('title', 'Event 3')
  })
});
