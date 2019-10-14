import React from 'react';
import './App.css';
import Main from './components/Main';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Admin from './components/admin/admin'

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path = "/">
            <Main/>
          </Route>
          <Route exact path = "/admin">
            <Admin/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
