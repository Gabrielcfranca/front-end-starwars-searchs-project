import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListContext from './ListContext';

const PLANET_LIST = 'https://swapi-trybe.herokuapp.com/api/planets/';

function ListProvider(props) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${PLANET_LIST}`);
        const data = await response.json();
        setLoading(false);
        setResults(data.results);
        setError(null);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  const { children } = props;

  const contextType = {
    results,
    loading,
    error,
  };

  return (
    <ListContext.Provider value={ contextType }>
      {children}
    </ListContext.Provider>
  );
}

ListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListProvider;
