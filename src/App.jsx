import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Routes from './Routes';
import FoodsProvider from './provider/FoodsProvider';

function App() {
  return (
    <FoodsProvider>
      <Routes />
    </FoodsProvider>
  );
}

export default App;
