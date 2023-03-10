import React, { useContext, useEffect, useState } from 'react';
import ListContext from '../Context/ListContext';
import styles from './Table.module.css';
import logo from './projectIntro.gif';
import TableData from './TableData';

function Table() {
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

  const initialOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [numericFilters, setNumericFilters] = useState([]);

  const [orderList, setOrderList] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

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

  const handleOrderPlanets = ({ target }) => {
    const { name, value } = target;
    setOrderList((prevOrderList) => ({
      order: {
        ...prevOrderList.order, [name]: value },
    }));
  };

  const orderPlanets = () => {
    const { column, sort } = orderList.order;
    const orderedPlanets = {
      ASC: (a, b) => a[column] - b[column],
      DESC: (a, b) => b[column] - a[column],
    };
    const ordered = filteredResults.filter((result) => result[column] !== 'unknown')
      .sort(orderedPlanets[sort]);
    const orderedUnknown = filteredResults.filter(
      (result) => result[column] === 'unknown',
    );
    const orderedResult = [...ordered, ...orderedUnknown];
    setFilteredResults(orderedResult);
  };

  return (
    <section className={ styles.header }>
      <img
        src={ logo }
        alt="starwars"
        className={ styles.imageHeader }
      />
      <div className={ styles.options }>
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
      <form>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            value={ form.column }
            data-testid="column-filter"
            onChange={ handleOptionChange }
          >
            { initialOptions.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            )) }
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
          Ordenar:
          <select
            name="column"
            id="column-sort"
            value={ orderList.order.column }
            data-testid="column-sort"
            onChange={ handleOrderPlanets }
          >
            { initialOptions.map((e) => (
              <option key={ e } value={ e }>{e}</option>
            )) }
          </select>
        </label>
        <label htmlFor="order-asc">
          <input
            type="radio"
            name="sort"
            id="order-asc"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleOrderPlanets }
          />
          Ascendente
        </label>
        <label htmlFor="order-desc">
          <input
            type="radio"
            name="sort"
            id="order-desc"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleOrderPlanets }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ orderPlanets }
        >
          Ordenar
        </button>
      </form>
      <TableData />
    </section>
  );
}
export default Table;
