
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Component/Admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Add from './Component/AddCategory';

import Dashboard from './Component/Dashboard';
import Login from './Component/login';
import Admin from './Component/Admin';
import Category from './Component/Category';
import AddCategory from './Component/AddCategory';
import Editcategory from './Component/EditCategory';
import AddAdmin from './Component/AddAdmin';
class App extends Component {


  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/Admins" component={Admin}></Route>
            <Route exact path="/AddAdmin" component={AddAdmin}></Route>
            <Route exact path="/categories" component={Category}></Route>
            <Route exact path="/AddCategory" component={AddCategory}></Route>
            <Route exact path="/:id/edit" component={Editcategory}></Route>
            <Route exact path="/:id/delete" component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
