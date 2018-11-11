import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Index from './pages/index';
import Disover from './components/Discover/Discover';

render(
  <Disover />,
  document.getElementById('root')
);
