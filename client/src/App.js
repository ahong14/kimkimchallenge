import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import PlansView from './components/PlansView/PlansView';
import NewTrip from './components/NewTrip/NewTrip';
import EditPlan from './components/EditPlan/EditPlan';
import EditDay from './components/EditDay/EditDay';

//Main application component, router is setup to handle routes and rendering appropiate components
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/trip-plans" component = {PlansView}/>
          <Route exact path = "/new" component = {NewTrip}/>
          <Route path = "/edit" component = {EditPlan}/>
          <Route path = "/day" component = {EditDay}/>
        </div>
      </Router>
    );
  }
}

export default App;
