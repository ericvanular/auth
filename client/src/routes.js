import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
    import SignUp from './SignUp';
    import Table from './Table';

const Routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Table} />
        <Route path='/signup' component={SignUp} />
        <Route path="/table" component={Table} />
    < /Route>
);

export default Routes;
