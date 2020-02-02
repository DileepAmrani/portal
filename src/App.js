import React from "react";
import { AdminRoute, UserRoute } from "./Config/Router";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      showAdminRoute: false
    };
  }

  render() {
    let admin = localStorage.getItem("user");
    if (JSON.parse(admin)) {
      if (JSON.parse(admin).data.isAdmin) {
        var showAdminRoute = true;
      } else {
        console.log("false");
         showAdminRoute = false;
      }
    }

    console.log(showAdminRoute);

    return <div> {showAdminRoute ? <AdminRoute /> : <UserRoute />}</div>;
  }
}
export default App;
