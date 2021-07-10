import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './pages/Main';
import './app.scss';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyStatsPage from './pages/MyStatsPage';
import RedirectPage from './pages/RedirectPage';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/mystats" component={MyStatsPage} />
          <Route path="/:id" component={RedirectPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
