import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <>
      <div
        className="relative starwars-grafismo
      bg-no-repeat bg-center
      h-72 bg-contain"
      >
        <div
          className="absolute top-1/3 -translate-y-1/2  starwars-logo
        bg-contain bg-no-repeat
        bg-center w-full h-20"
        />
      </div>
      <div className="px-4">
        <div
          className="border border-white
        rounded-xl -translate-y-3 sm:-translate-y-5 lg:-translate-y-7"
        >
          <Filters />
          <Table />
        </div>
      </div>
    </>
  );
}

export default App;
