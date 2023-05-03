import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [results, setResults] = useState([]);
  const [filterName, setFilterName] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterOperator, setFilterOperator] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);
  const [filters, setFilters] = useState([]);
  const [initialResults, setInitialResults] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      const responseData = await fetch('https://swapi.dev/api/planets');
      const fullPlanetList = await responseData.json();
      const planetList = fullPlanetList.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setResults(planetList);
      setInitialResults(planetList);
    }
    fetchPlanets();
  }, []);

  const handleFilter = useCallback(() => {
    if (filterOperator.includes('maior que')) {
      const filtered = results
        .filter((e) => Number(e[filterColumn]) > Number(filterNumber));
      setResults(filtered);
      setFilters([...filters, { filterColumn, filterOperator, filterNumber }]);
      return;
    }
    if (filterOperator.includes('menor que')) {
      const filtered = results
        .filter((e) => Number(e[filterColumn]) < Number(filterNumber));
      setResults(filtered);
      setFilters([...filters, { filterColumn, filterOperator, filterNumber }]);
      return;
    }
    const filtered = results
      .filter((e) => Number(e[filterColumn]) === Number(filterNumber));
    setResults(filtered);
    setFilters([...filters, { filterColumn, filterOperator, filterNumber }]);
  }, [filterColumn, filterOperator, filterNumber, filters, results]);

  // const createFilter = useCallback(() => setFilters(
  //   [...filters, { filterColumn, filterOperator, filterNumber }],
  // ), [filterColumn, filterOperator, filterNumber, filters]);

  // const applyFilters = useCallback(() => {
  //   filters.forEach((filter) => {
  //     if (filter.filterOperator.includes('maior que')) {
  //       const filtered = results
  //         .filter((e) => Number(e[filter.filterColumn]) > Number(filter.filterNumber));
  //       setResults(filtered);
  //       return;
  //     }
  //     if (filter.filterOperator.includes('menor que')) {
  //       const filtered = results
  //         .filter((e) => Number(e[filter.filterColumn]) < Number(filter.filterNumber));
  //       setResults(filtered);
  //       return;
  //     }
  //     const filtered = results
  //       .filter((e) => Number(e[filter.filterColumn]) === Number(filter.filterNumber));
  //     setResults(filtered);
  //   });
  // }, [filters, results]);

  // const values = useMemo(() => ({
  //   results,
  //   setResults,
  //   filterName,
  //   setFilterName,
  //   filterColumn,
  //   setFilterColumn,
  //   filterOperator,
  //   setFilterOperator,
  //   filterNumber,
  //   setFilterNumber,
  //   filters,
  //   setFilters,
  //   createFilter,
  //   initialResults,
  //   applyFilters,
  //   setInitialResults,
  // }), [results, filterName, setFilterName, filterColumn,
  //   setFilterColumn, filterOperator, setFilterOperator, filterNumber, setFilterNumber,
  //   filters, setFilters, createFilter, initialResults, setInitialResults, applyFilters]);

  const values = useMemo(() => ({
    results,
    setResults,
    filterName,
    setFilterName,
    filterColumn,
    setFilterColumn,
    filterOperator,
    setFilterOperator,
    filterNumber,
    setFilterNumber,
    filters,
    setFilters,
    handleFilter,
    initialResults,
    setInitialResults,
  }), [results, filterName, setFilterName, filterColumn,
    setFilterColumn, filterOperator, setFilterOperator, filterNumber, setFilterNumber,
    filters, setFilters, handleFilter, initialResults, setInitialResults]);

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
