import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function Filters() {
  const { filterName, setFilterName, filterColumn,
    setFilterColumn, filterOperator, setFilterOperator,
    filterNumber, setFilterNumber, handleFilter } = useContext(PlanetsContext);

  return (
    <form>
      <input
        type="text"
        value={ filterName }
        onChange={ ({ target }) => setFilterName(target.value) }
        data-testid="name-filter"
      />

      <select
        value={ filterColumn }
        onChange={ ({ target }) => setFilterColumn(target.value) }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        value={ filterOperator }
        onChange={ ({ target }) => setFilterOperator(target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        value={ filterNumber }
        onChange={ ({ target }) => setFilterNumber(target.value) }
        data-testid="value-filter"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
