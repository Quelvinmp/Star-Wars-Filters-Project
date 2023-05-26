import { useContext } from 'react';
import { PlanetsContext } from '../../contexts/PlanetsProvider';

export default function NumberFilter() {
  const { filterOperator, setFilterOperator,
    filterNumber, setFilterNumber } = useContext(PlanetsContext);

  return (
    <div className="flex gap-1 justify-center">
      <select
        className="bg-neutral select select-bordered w-1/2  text-white "
        value={ filterOperator }
        onChange={ ({ target }) => setFilterOperator(target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        className="bg-neutral input w-1/2 "
        type="number"
        value={ filterNumber }
        onChange={ ({ target }) => setFilterNumber(target.value) }
        data-testid="value-filter"
      />
    </div>
  );
}
