
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
import Source from './Component/IncomeSource/Source';
import AddSource from './Component/IncomeSource/AddSource';
import EditSource from './Component/IncomeSource/EditSource';
import Expenses from './Component/Expenses/Expenses';
import EditAdmin from './Component/EditAdmin';
import Chart from './Component/Chart/Chart';
import BarChartComponent from './Component/Chart/Chart';
import PieChartComponent from './Component/Chart/PieChart';
import AddExpense from './Component/Expenses/AddExpense';
import EditExpense from './Component/Expenses/EditExpense';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/BarChart" component={BarChartComponent}></Route>
            <Route exact path="/PieChart" component={PieChartComponent}></Route>

            <Route exact path="/Admins" component={Admin}></Route>
            <Route exact path="/AddAdmin" component={AddAdmin}></Route>
            <Route exact path="/:id/EditAdmin" component={EditAdmin}></Route>

            <Route exact path="/categories" component={Category}></Route>
            <Route exact path="/AddCategory" component={AddCategory}></Route>
            <Route exact path="/:id/edit" component={Editcategory}></Route>

            <Route exact path="/Source" component={Source}></Route>
            <Route exact path="/AddSource" component={AddSource}></Route>
            <Route exact path="/:id/editSource" component={EditSource}></Route>

            <Route exact path="/Expenses" component={Expenses}></Route>
            <Route exact path="/AddExpense" component={AddExpense}></Route>
            <Route exact path="/:id/editExpense" component={EditExpense}></Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
