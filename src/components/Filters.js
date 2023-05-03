import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function Filters() {
  // const { filterName, setFilterName, filterColumn,
  //   setFilterColumn, filterOperator, setFilterOperator,
  //   filterNumber, setFilterNumber,
  //   applyFilters, createFilter } = useContext(PlanetsContext);
  const { filterName, setFilterName, filterColumn,
    setFilterColumn, filterOperator, setFilterOperator,
    filterNumber, setFilterNumber, handleFilter, filters } = useContext(PlanetsContext);

  const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

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
        {/* <option
          disabled={ filters
            .some((filter) => filter.filterColumn === 'population') }
        >
          population
        </option>
        <option
          disabled={ filters
            .some((filter) => filter.filterColumn === 'orbital_period') }
        >
          orbital_period
        </option>
        <option
          disabled={ filters
            .some((filter) => filter.filterColumn === 'diameter') }
        >
          diameter
        </option>
        <option
          disabled={ filters
            .some((filter) => filter.filterColumn === 'rotation_period') }
        >
          rotation_period
        </option>
        <option
          disabled={ filters.some((filter) => filter.surface_water) }
        >
          surface_water
        </option> */}
        {filters.length > 0 ? options.map((option, index) => {
          if (!filters.some((filter) => filter.filterColumn === option)) {
            return (
              <option key={ index }>{option}</option>
            );
          }
        }) : options.map((option, index) => (
          <option key={ index }>{option}</option>
        )) }
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
        onClick={ () => handleFilter() }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
