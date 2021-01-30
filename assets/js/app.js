import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Memory from './pages/memory';
import '../styles/app.css';

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
