import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Routes from './Routes';
import FoodsProvider from './provider/FoodsProvider';
import './styles/App.css';

function App() {
  return (
    <FoodsProvider>
      <Routes />
    </FoodsProvider>
  );
}

export default App;
