import React from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
import './style.scss';
import { useRoutes } from '../../routes';

const Main: React.FC = () => {

  return ( 
    <main>
      <div className="inner container-centered container"> 
        {useRoutes()} 
      </div>
    </main>
  );
};

export {
  Main
};