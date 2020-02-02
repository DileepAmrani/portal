import React from "react";
import { Navbar, Footer ,Spinner} from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import './NotFound.css'
class NotFound extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: true,
      loginValue: "Login",
      func: "login",
      value : undefined,
      loader: true
    };
  }

  componentDidMount = async() => {
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
      } 
      else {
        this.setState({ loginValue: "login", func: "login" });
      }
    });
      await setTimeout( ()=> {
         this.setState({
           loader: true
         })
       }, 1000);
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
        <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value = {this.state.value}
        /> 
       
        <div className="notfound">
        {this.state.loader ? <Spinner /> :
          <p > Opps! Page Not Found.....</p >
        }
        </div>

        <Footer />
      </div>
    );
  }
}

export default NotFound;
