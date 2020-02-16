import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { StoreProvider } from "./utils/GlobalState";

function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Landing} />
            <Route exact path="/product/:sku" component={Product} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
