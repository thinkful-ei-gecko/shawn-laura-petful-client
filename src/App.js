import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import PetsPage from './components/PetsPage';



class App extends Component {

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/pets' component={PetsPage} />
          </Switch>
        </Router>

      </div>
    );
  
  }
}

export default App;
