import { useEffect, useState } from 'react';

const useFetchPlanets = () => {
  const [results, setFetch] = useState({});

  useEffect(() => {
    async function fetchPlanets() {
      const responseData = await fetch('https://swapi.dev/api/planets');
      const planetList = await responseData.json();
      setFetch(planetList);
    }
    fetchPlanets();
  }, []);

  return { results, setFetch };
};

export default useFetchPlanets;
