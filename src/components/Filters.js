import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';
import Order from './FiltersComponents/Order';
import NumberFilter from './FiltersComponents/NumberFilter';

function Filters() {
  const { filterName, setFilterName, filterColumn,
    setFilterColumn, handleFilter,
    filters, deleteFilter, deleteAllFilters } = useContext(PlanetsContext);
  const [newOptions, setNewOptions] = useState([]);

  const options = ['population', 'rotation_period',
    'diameter', 'orbital_period', 'surface_water'];

  const getNewOptions = () => filters.length > 0 && options.filter((option) => {
    if (!filters.some((filter) => filter.filterColumn === option)) return option;
    return null;
  });

  useEffect(() => {
    if (filters.length > 0) {
      setNewOptions(getNewOptions());
      setFilterColumn(getNewOptions()[0]);
    }
  }, [filters]);

  return (
    <form
      className="p-4 text-white"
    >
      <div className="flex flex-col space-y-12">

        <div className="flex flex-col gap-4">
          <input
            className="input input-bordered w-full max-w-xs bg-neutral text-white"
            type="text"
            placeholder="Planet Name"
            value={ filterName }
            onChange={ ({ target }) => setFilterName(target.value) }
            data-testid="name-filter"
          />

          <select
            className="select bg-neutral select-bordered w-full max-w-xs text-white"
            value={ filterColumn }
            onChange={ ({ target }) => setFilterColumn(target.value) }
            data-testid="column-filter"
          >
            {filters.length > 0 ? newOptions.map((option, index) => (
              <option key={ index }>{option}</option>
            )) : options.map((option, index) => (
              <option key={ index }>{option}</option>
            )) }
          </select>

          <NumberFilter />

          <button
            className="btn btn-warning w-full"
            type="button"
            data-testid="button-filter"
            onClick={ handleFilter }
          >
            Filtrar
          </button>
        </div>

        <Order />

        {filters.length > 0 && (
          <div className="bg-neutral-900/80 p-2 rounded-xl flex flex-col h-fit">
            <div>
              { filters.length > 0 && filters
                .map((filter, index) => {
                  const { filterColumn: c, filterOperator: o, filterNumber: n } = filter;
                  return (
                    <div
                      className="flex px-2 justify-between bg-neutral my-2 rounded-xl
                  items-center"
                      data-testid="filter"
                      key={ index }
                    >
                      <p className="text-center">
                        {`${c} ${o} ${n}`}
                      </p>
                      <button
                        className="btn btn-link text-red-400"
                        type="button"
                        data-testid="delete-filter"
                        onClick={ () => {
                          deleteFilter(filter);
                        } }
                      >
                        Apagar
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              className="w-3/4 p-0 btn btn-link text-red-400 self-center"
              type="button"
              onClick={ deleteAllFilters }
              data-testid="button-remove-filters"
            >
              Remover Todos os Filtros
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Filters;
