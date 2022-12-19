import React, { useContext, useEffect, useState } from 'react';
import ListContext from '../Context/ListContext';
import styles from './Table.module.css';
import logo from './projectIntro.gif';

function Header() {
  const { results,
    nameFilter,
    setNameFilter,
    filteredResults,
    setFilteredResults,
  } = useContext(ListContext);

  const [form, setForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [numericFilters, setNumericFilters] = useState([]);

  useEffect(() => {
    const filteredData = results.filter((result) => {
      const lowerName = result.name.toLowerCase();
      return lowerName.includes(nameFilter.filterByName);
    });
    const resultReduce = numericFilters.reduce((acc, filter) => acc.filter((result) => {
      switch (filter.comparison) {
      case 'maior que':
        return Number(result[filter.column]) > Number(filter.value);
      case 'menor que':
        return Number(result[filter.column]) < Number(filter.value);
      case 'igual a':
        return Number(result[filter.column]) === Number(filter.value);
      default:
        return true;
      }
    }), filteredData);
    setFilteredResults(resultReduce);
    // const oldResults = filteredResults();
    // console.log(oldResults, 'oldResults');
  }, [nameFilter, numericFilters, results, setFilteredResults]);

  const handleOptionChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleNumericFilter = () => {
    // event.preventDefault();
    const { column, comparison, value } = form;
    const newNumericFilter = { column, comparison, value };
    setNumericFilters((prevNumericFilters) => [...prevNumericFilters, newNumericFilter]);
  };

  const eraseFilter = (index) => {
    setNumericFilters(
      numericFilters.filter((_item, itemIndex) => itemIndex !== index),
    );
  };

  const removeAllFilters = () => {
    setNumericFilters([]);
  };

  return (
    <div className={ styles.table }>
      <img
        src={ logo }
        alt="starwars"
        className={ styles.imageHeader }
      />
      <div className={ styles.header }>
        <h1>Projeto Star Wars - Trybe</h1>
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
      <form className={ styles.header }>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            value={ form.column }
            data-testid="column-filter"
            onChange={ handleOptionChange }
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
            onChange={ handleOptionChange }
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
            onChange={ handleOptionChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumericFilter }
        >
          Filtrar
        </button>

        { numericFilters.map((filter, index) => (
          <div key={ index }>
            <p data-testid="filter" key={ filter.column }>
              {
                `${filter.column} - ${index} - ${filter.comparison} - ${filter.value}  `
              }
              <button
                type="button"
                onClick={ () => eraseFilter(index) }
              >
                x
              </button>
            </p>
          </div>
        )) }
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filtros
        </button>
        <label htmlFor="column-sort">
          Coluna:
          <select
            name="column-sort"
            id="column-sort"
            value={ form.column }
            data-testid="column-sort"
            onChange={ handleOptionChange }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default Header;
