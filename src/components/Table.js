/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { PlanetsContext } from '../contexts/PlanetsProvider';

function Table() {
  const { results, filterName } = useContext(PlanetsContext);

  return (
    <div className="overflow-x-auto pb-3">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th />
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 && results.filter((e) => e.name.includes(filterName))
            .map((e, index) => (
              <tr key={ index }>
                <td />
                <td data-testid="planet-name">{e.name}</td>
                <td>{e.rotation_period}</td>
                <td>{e.orbital_period}</td>
                <td>{e.diameter}</td>
                <td>{e.climate}</td>
                <td>{e.gravity}</td>
                <td>{e.terrain}</td>
                <td>{e.surface_water}</td>
                <td>{e.population}</td>
                <td>{e.films}</td>
                <td>{e.created}</td>
                <td>{e.edited}</td>
                <td>{e.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
