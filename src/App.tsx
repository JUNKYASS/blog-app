import React from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import './style.scss';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Main />
    </React.Fragment>
  );
};

export default App;