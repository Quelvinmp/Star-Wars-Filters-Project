import { useContext } from 'react';
import { PlanetsContext } from '../../contexts/PlanetsProvider';

export default function NumberFilter() {
  const { filterOperator, setFilterOperator,
    filterNumber, setFilterNumber } = useContext(PlanetsContext);

  return (
    <div className="flex gap-1">
      <select
        className="bg-neutral select select-bordered w-1/2  text-white max-w-xs"
        value={ filterOperator }
        onChange={ ({ target }) => setFilterOperator(target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        className="bg-neutral input w-1/2 max-w-xs text-white"
        type="number"
        value={ filterNumber }
        onChange={ ({ target }) => setFilterNumber(target.value) }
        data-testid="value-filter"
      />
    </div>
  );
}
