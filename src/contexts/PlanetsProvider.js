import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetchPlanets from '../hooks/useFetchPlanets';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const { results, setFetch } = useFetchPlanets();

  const values = useMemo(() => ({
    results, setFetch,
  }), [results, setFetch]);

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
