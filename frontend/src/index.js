import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './pages/index';
import Discover from './components/Discover/Discover';
import Cards from './pages/cards';
import LandingPage from './pages/landing-page';

import './app.css'

render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/chain' component={Index}/>
      <Route exact path='/discover' component={Discover}/>
      <Route exact path='/cards' component={Cards}/>
    </Switch>

  </BrowserRouter>
), document.getElementById('root'))
