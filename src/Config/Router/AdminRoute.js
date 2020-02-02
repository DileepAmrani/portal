import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {  Home, NotFound, Dashboard, Login, About, Helpandsupport, ForgetPassword, AddTrainer, AddGym, AddUser, AddProgram, } from "../../Containers";

function AdminRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/helpandsupport" component={Helpandsupport} />
        <Route path="/rest-password" component={ForgetPassword} />
        <Route path="/add-trainer" component={AddTrainer} />
        <Route path="/add-gym" component={AddGym} />
        <Route path="/add-user" component={AddUser} />
        <Route path="/add-program" component={AddProgram} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
export default AdminRoute;
