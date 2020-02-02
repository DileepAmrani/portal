import React from "react";
import { Navbar, Slider, AboutCoach,Sidebar, Footer } from "../../Components";

import { firebaseApp } from "../../Config/Firebase/Firebase.js";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: true,
      loginValue: "Login",
      func: "login",
      value : undefined
    };
  }

  componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        let user = localStorage.getItem("user")
        console.log(JSON.parse(user).data.isAdmin)
        if(JSON.parse(user).data.isAdmin){
          this.setState({ loginValue: "Logout", func: "logout",value : "Dashboard"});
        }
        else{
          this.setState({ loginValue: "Logout", func: "logout",value : "Profile"});
        }
        this.props.history.push("/dashboard");
      } 
      else {
        this.setState({ loginValue: "login", func: "login" });
      }
    });
  }
  login = () => {
    this.props.histroy.push("/login");
  };
  logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("user")
        this.props.history.push("/login");
      })
      .catch(error => {});
  };
  render() {
    return (
      <div>
       {!this.state.value ?
       <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value = {this.state.value}
        /> :
      <Sidebar path = {this.props.history} /> 
    }
    <div style={{marginTop: "75px"}}>


        <Slider className = {this.props.value}/>
        <AboutCoach />

        <Footer />
    </div>
      </div>
    );
  }
}

export default Home;
