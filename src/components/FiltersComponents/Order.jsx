import { useContext } from 'react';
import { PlanetsContext } from '../../contexts/PlanetsProvider';

export default function Order() {
  const { sortOption, setSortOption, handleCheck,
    radioValue, sortPlanets } = useContext(PlanetsContext);
  return (
    <div className="flex items-center flex-col gap-4 w-full lg:w-1/3 self-start">

      <select
        className="bg-neutral select select-bordered w-full  text-white"
        data-testid="column-sort"
        value={ sortOption }
        onChange={ ({ target }) => setSortOption(target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <div
        className="flex justify-center gap-10
      bg-neutral-900/80 p-2 rounded-xl
      w-full"
      >
        <label htmlFor="asc" className="relative">
          <input
            className="radio radio-warning radio-xs absolute top-0.5 -left-5"
            type="radio"
            value="ASC"
            id="asc"
            data-testid="column-sort-input-asc"
            checked={ radioValue === 'ASC' }
            onChange={ (e) => handleCheck(e.target.value) }
          />
          ASC
        </label>

        <label htmlFor="desc" className="relative">
          <input
            className="radio radio-warning radio-xs absolute top-0.5 -left-5"
            type="radio"
            value="DESC"
            id="desc"
            data-testid="column-sort-input-desc"
            checked={ radioValue === 'DESC' }
            onChange={ (e) => handleCheck(e.target.value) }
          />
          DESC
        </label>
      </div>

      <button
        className="btn btn-warning w-full"
        type="button"
        data-testid="column-sort-button"
        onClick={ sortPlanets }
      >
        Ordenar
      </button>
    </div>
  );
}
