import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Index from './pages/index';
<<<<<<< HEAD
import Cards from './pages/cards';
import LandingPage from './pages/landing-page';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './app.css'

render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/chain' component={Index}/>
      <Route exact path='/cards' component={Cards}/>
    </Switch>

  </BrowserRouter>
), document.getElementById('root'))
=======
import Disover from './components/Discover/Discover';

render(
  <Disover />,
  document.getElementById('root')
);
>>>>>>> 6a2a4861358743e7eae2dcf9715012e350ce6580
