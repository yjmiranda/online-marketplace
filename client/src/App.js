import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./pages/Landing";

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
