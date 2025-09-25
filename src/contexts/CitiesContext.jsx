import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        ("Unknown Error");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
	if (context === undefined) throw new Error('CitiesContext was used outside CitiesProvider')
  return context;
}
/* eslint-disable react-refresh/only-export-components */

export { CitiesProvider, useCities };
