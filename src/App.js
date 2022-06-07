import React from 'react';
import './App.css';
import Table from './Components/Table';
import ListProvider from './Context/ListProvider';

function App() {
  return (
    <ListProvider>
      <main className="App">
        <Table />
      </main>
    </ListProvider>
  );
}

export default App;
