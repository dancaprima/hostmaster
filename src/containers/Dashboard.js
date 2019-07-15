import React, { Component } from 'react';
import CustomDrawer from '../components/Drawer';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './Home';
import UserForm from './User/UserForm';
import UserView from './User/UserView';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }
  render() {
    return (
      <div>
        <CustomDrawer>
          <Switch>
            <Route path="/dashboard/home" component={Home} />
            <Route exact path="/dashboard/users" component={UserView} />
            <Route exact path="/dashboard/users/add" component={UserForm} />
            <Route
              exact
              path="/dashboard/users/edit/:id"
              component={UserForm}
            />
          </Switch>
        </CustomDrawer>
      </div>
    );
  }
}

export default Dashboard;
