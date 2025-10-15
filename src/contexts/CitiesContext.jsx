import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
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
  async function getCity(id) {
try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        ("Unknown Error");
      } finally {
        setIsLoading(false);
      }
  }

  async function createCity(newCity) {
try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        const data = await res.json();
        setCities(cities => [...cities, data]);
      } catch {
        ("Unknown Error");
      } finally {
        setIsLoading(false);
      }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside CitiesProvider");
  return context;
}
/* eslint-disable react-refresh/only-export-components */

export { CitiesProvider, useCities };
