import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1);
  // fn tri des events par date de la + ancienne à la + récente (si eventA est + grand que eventB retourne 1 sinon -1)
  
  const byDateDescLength = byDateDesc?.length;
  const nextCard = () => {
    setIndex(index < byDateDescLength -1 ? index + 1 : 0) // si l'index (position init) est supérieur à la taille du tableau (index commençant par 0), alors renvoie 0 sinon l'index position +1
  };

  useEffect(() => {
    const timeoutSlide = setTimeout(() => {
      nextCard()
      // eslint-disable-next-line no-console
    }, 5000);
    return () => clearTimeout(timeoutSlide) 
  }, [index]);/* le tableau de dépendances prend en paramètre l'index pour que l'effet se déclenche à chaque fois que l'index change */

  return (
      <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title} /* ajout d'une div avec clé pour éviter erreur clé unique */ > 
          <div 
            className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
            }`}> 
            <img src={`https://maeva95.github.io/Debuggez-une-application-React.JS/${event.cover}`} alt="forum"/>
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3 data-testid="test-title">{event.title}</h3>
                <p data-testid="test-description">{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => ( // voir le problème de clé unique
              <input
                key={`radio-${index}-${_.title}`}
                type="radio"
                name="radio-button"
                checked={index === radioIdx} // relatif à l'index
                readOnly
              />
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;

