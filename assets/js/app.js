import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Memory from './pages/memory';
import '../styles/app.css';

/**
 * Point d'entrée de l'application,
 * ainsi que le routeur qui sert à naviguer entre les pages de l'application
 */
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path='/' component={Memory} />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
