import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const res = await fetch("https://maeva95.github.io/Debuggez-une-application-React.JS/events.json");
    // eslint-disable-next-line no-console
    console.log(res.json())
    return res.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      const resData = await api.loadData()
      setData(resData);
      // eslint-disable-next-line no-console
      console.log("Données récupérées avec succès :", resData)
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  }, []);
  
  // déclaration de la fonction sort à la racine pour éviter l'erreur "The prop `imageSrc` is marked as required but but its value is `undefined`" 
  const sortLastEvents = 
  [...(data?.events || [])].sort((evtA, evtB) => // nouveau tableau pour éviter d'écraser le tableau des events d'EventList
  new Date(evtB.date) - new Date(evtA.date))
  
  const last = sortLastEvents[0] // 0 séléctionne le premier élément du tableau trié
  // eslint-disable-next-line no-console
  console.log(last?.id)
  

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
