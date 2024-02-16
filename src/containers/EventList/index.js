import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // retourne le tableau des évènements associés aux différents types d'event
  const filteredEventsByType = () => {
    if(!type) {
      return data?.events || []
    }
    return data?.events?.filter((event) => event.type === type)
  }
  // fonction pour afficher les événements filtrés par page
  function filteredEventsbypage () {
    return (currentPage -1) * PER_PAGE
  }
  // fonction qui permet d'afficher les events séléctionnés 
  function filteredEvents () {
    return filteredEventsByType(data?.events, type).slice(
      filteredEventsbypage(),
      filteredEventsbypage() + PER_PAGE
    );

  }
  // change les types d'option
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.ceil((filteredEventsByType()?.length || 0) / PER_PAGE); // affichage de la pagination des évènements filtrés 
  const typeList = new Set(data?.events?.map((event) => event.type)); // récupère les types d'évènement et élimine les doublons
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading" 
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer"  data-testid='eventList'>
            {filteredEvents().map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    imageAlt={event.title}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
