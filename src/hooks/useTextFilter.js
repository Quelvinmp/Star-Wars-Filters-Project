import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function useTextFilter(text) {
  const { results, setResults } = useContext(PlanetsContext);

  if (results.length > 0 && text) {
    const newResults = results.filter((planet) => planet.name.includes(text));
    console.log(newResults);
    setResults(newResults);
  }

  return { results, setResults };
}

export default useTextFilter;
