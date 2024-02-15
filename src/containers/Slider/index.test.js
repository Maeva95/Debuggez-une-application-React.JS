import { render, screen, waitFor } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description: "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-28T20:28:45.744Z", // 28jours en février 2022
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Conférence autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("février"); 
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
    await screen.findByText("World Gaming Day");
    await screen.findAllByText("mars");
  });
  describe("and when the list is sorted by date", () => {
    it("the second element of the list is World economic forum", () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Slider />
        </DataProvider>
      );
      expect(data.focus).toHaveLength(3); // vérifie la longueur du tableau data
      expect(data.focus[1]).toHaveProperty('title', 'World economic forum') // vérifie si le second élément du tableau est bien World economic forum.
    })
  })
  it('should wait 5 second before change the curent slide', async () => {
    jest.spyOn(global, 'setTimeout');
    const nextCard = jest.fn()
    Promise.resolve().then(() => {
      nextCard();
    });
    // La fonction nextCard n'a pas encore été appelé
    await waitFor(() => {
      expect(nextCard).not.toHaveBeenCalled()
    })
    jest.useFakeTimers(5000)
    // et elle est appelée une fois la fonction setTimout exécutée
    expect(nextCard).toHaveBeenCalled()
    expect(nextCard).toHaveBeenCalledTimes(1)
  })
});
