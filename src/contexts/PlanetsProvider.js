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
  const [sortOption, setSortOption] = useState('population');
  const [radioValue, setRadioValue] = useState('');

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

  const sortPlanets = useCallback(() => {
    if (radioValue === 'ASC') {
      const unknown = results.filter((e) => e[sortOption] === 'unknown');
      const notUnknown = results.filter((e) => e[sortOption] !== 'unknown');
      const sortedArray = notUnknown
        .sort((a, b) => Number(a[sortOption]) - Number(b[sortOption]));
      setResults([...sortedArray, ...unknown]);
      return;
    }
    if (radioValue === 'DESC') {
      const unknown = results.filter((e) => e[sortOption] === 'unknown');
      const notUnknown = results.filter((e) => e[sortOption] !== 'unknown');
      const sortedArray = notUnknown
        .sort((a, b) => Number(b[sortOption]) - Number(a[sortOption]));
      setResults([...sortedArray, ...unknown]);
    }
  }, [radioValue, results, sortOption]);

  const handleCheck = useCallback((e) => {
    setRadioValue(e);
  }, [setRadioValue]);

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

  const applyFilters = useCallback((item) => {
    if (item.filterOperator.includes('maior que')) {
      const filtered = initialResults
        .filter((e) => Number(e[item.filterColumn]) > Number(item.filterNumber));
      setResults(filtered);
      return;
    }
    if (item.filterOperator.includes('menor que')) {
      const filtered = initialResults
        .filter((e) => Number(e[item.filterColumn]) < Number(item.filterNumber));
      setResults(filtered);
      return;
    }
    const filtered = initialResults
      .filter((e) => Number(e[item.filterColumn]) === Number(item.filterNumber));
    setResults(filtered);
  }, [initialResults]);

  const deleteFilter = useCallback((filter) => {
    setResults(initialResults);
    const newFilters = filters.filter((item) => {
      if (filter.filterColumn !== item.filterColumn) {
        applyFilters(item);
        return item;
      }
      return null;
    });
    setFilters(newFilters);
  }, [applyFilters, filters, initialResults]);

  const deleteAllFilters = useCallback(() => {
    setFilters([]);
    setResults(initialResults);
  }, [setFilters, setResults, initialResults]);

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
    deleteFilter,
    deleteAllFilters,
    sortOption,
    setSortOption,
    handleCheck,
    radioValue,
    setRadioValue,
    sortPlanets,
  }), [results, filterName, setFilterName, filterColumn,
    setFilterColumn, filterOperator, setFilterOperator, filterNumber, setFilterNumber,
    filters, setFilters, handleFilter, initialResults,
    setInitialResults, deleteFilter, deleteAllFilters, sortOption,
    setSortOption, handleCheck, radioValue, setRadioValue, sortPlanets]);

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
