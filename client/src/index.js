import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import routes from './routes';

ReactDOM.render(
  <Router children={routes} history={browserHistory} />,
  document.getElementById('root')
);
