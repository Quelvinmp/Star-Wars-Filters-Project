import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [results, setResults] = useState([]);
  const [filterName, setFilterName] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      const responseData = await fetch('https://swapi.dev/api/planets');
      const fullPlanetList = await responseData.json();
      const planetList = fullPlanetList.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setResults(planetList);
    }
    fetchPlanets();
  }, []);

  const values = useMemo(() => ({
    results,
    setResults,
    filterName,
    setFilterName,
  }), [results, filterName, setFilterName]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
