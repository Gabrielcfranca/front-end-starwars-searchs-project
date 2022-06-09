import React, { useContext, useState } from 'react';
import ListContext from '../Context/ListContext';

function Table() {
  const { results } = useContext(ListContext);
  const { nameFilter, setNameFilter } = useContext(ListContext);
  const [form, setForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  console.log(setForm);
  const filteredResults = () => (
    results.filter((result) => {
      const lowerName = result.name.toLowerCase();
      return lowerName.includes(nameFilter.filterByName);
    })
  );

  // setNameFilter(filteredResults);
  // setNameFilter((prevNameFilter) => ({
  //   ...prevNameFilter,
  //   filterByName: {
  //     name: prevNameFilter.filterByName.name,
  //   },
  // })),

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <div>
        <label htmlFor="search">
          <input
            type="text"
            placeholder="Pesquisar..."
            data-testid="name-filter"
            value={ nameFilter.filterByName }
            onChange={ ({ target }) => setNameFilter({ filterByName: target.value }) }
          />
        </label>
      </div>
      <form>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            value={ form.column }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            name="comparison"
            id="comparison-filter"
            value={ form.comparison }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor:
          <input
            type="number"
            name="value"
            id="value-filter"
            value={ form.value }
            data-testid="value-filter"
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          // onClick={  }
        >
          Filtrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody className="table-body">
          { filteredResults().map((e) => (
            <tr key={ e.name }>
              <td>{ e.name }</td>
              <td>{ e.rotation_period }</td>
              <td>{ e.orbital_period }</td>
              <td>{ e.diameter }</td>
              <td>{ e.climate }</td>
              <td>{ e.gravity }</td>
              <td>{ e.terrain }</td>
              <td>{ e.surface_water }</td>
              <td>{ e.population }</td>
              <td>{ e.films.length }</td>
              <td>{ e.created }</td>
              <td>{ e.edited }</td>
              <td>{ e.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
