import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function Filters() {
  const { filterName, setFilterName, filterColumn,
    setFilterColumn, filterOperator, setFilterOperator,
    filterNumber, setFilterNumber, handleFilter,
    filters, deleteFilter, deleteAllFilters } = useContext(PlanetsContext);

  const options = ['population', 'rotation_period',
    'diameter', 'orbital_period', 'surface_water'];

  const getNewOptions = () => filters.length > 0 && options.filter((option) => {
    if (!filters.some((filter) => filter.filterColumn === option)) return option;
    return null;
  });
  const newOptions = getNewOptions();

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
        {filters.length > 0 ? newOptions.map((option, index) => {
          if (index === 0) setFilterColumn(option);
          return (
            <option key={ index }>{option}</option>
          );
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

      <div>
        { filters.length > 0 && filters
          .map((filter, index) => (
            <div data-testid="filter" key={ index }>
              <p>
                {`${filter.filterColumn} ${filter.filterOperator} ${filter.filterNumber}`}
              </p>
              <button
                type="button"
                onClick={ () => {
                  deleteFilter(filter);
                } }
              >
                Apagar
              </button>
            </div>
          ))}
      </div>

      <button
        type="button"
        onClick={ deleteAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Todos os Filtros

      </button>
    </form>
  );
}

export default Filters;
