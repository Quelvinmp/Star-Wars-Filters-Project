import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function Filters() {
  const { filterName, setFilterName } = useContext(PlanetsContext);

  return (
    <form>
      <input
        type="text"
        value={ filterName }
        onChange={ ({ target }) => setFilterName(target.value) }
        data-testid="name-filter"
      />
    </form>
  );
}

export default Filters;
