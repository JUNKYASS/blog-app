import React from 'react';
import { Link } from 'react-router-dom';
import { pagesList } from '../../routes';
import './style.scss';

const DropdownMenu: React.FC = () => {
  return (
    <nav className="dropdown-menu">
      {
        pagesList.map(page => {
          return (
            <div className="link" key={page.id}>
              <Link to={page.link}>{page.name} page</Link>
            </div>
          );
        })
      }
    </nav>
  );
};

export {
  DropdownMenu
};
