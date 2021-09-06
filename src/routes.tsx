import React, { ReactNode } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Faq } from './pages/Faq';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { Page } from './types';

const pagesList: Page[] = [ // Храним данные о имеющихся в проекте страницах
  {
    id: 1,
    name: 'Feed',
    link: '/'
  },
  {
    id: 2,
    name: 'Faq',
    link: '/faq'
  },
  {
    id: 3,
    name: 'Profile',
    link: '/profile'
  },
];

const useRoutes: any = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Feed />
      </Route>

      <Route path='/profile' exact>
        <Profile />
      </Route>

      <Route path='/faq' exact>
        <Faq />
      </Route>

      <Redirect to='/' />
    </Switch>
  );
};

export {
  useRoutes,
  pagesList
};