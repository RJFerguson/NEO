import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers/';

import Index from './pages/index';
import Discover from './components/Discover/Discover';
import Cards from './pages/cards';
import Analysis from './pages/analysis';
import LandingPage from './pages/landing-page';

import './app.css'

render((
  <Router history={history}>
    <Switch>
      <Route exact path='/chain' component={Index}/>
      <Route exact path='/discover' component={Discover}/>
      <Route exact path='/cards' component={Cards}/>
      <Route exact path='/key/:key' component={Analysis}/>
      <Route exact path='/' component={LandingPage}/>
    </Switch>
  </Router>
), document.getElementById('root'))
