import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, NotFound, Profile, Login ,About ,Helpandsupport,ForgetPassword } from "../../Containers";

function UserRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/helpandsupport" component={Helpandsupport} />
        <Route path="/rest-password" component={ForgetPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
export default UserRoute;
