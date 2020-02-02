import React from "react";
import { Navbar, Footer } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import { MDBContainer, MDBRow, MDBCol, } from "mdbreact";
import "./Help.css"
class Help extends React.Component {
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
      
      <div >
        <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value={this.state.value}
        />
        <div className="help">
        <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Write to us</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Your name
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
            />
            <label htmlFor="defaultFormContactEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormContactEmailEx"
              className="form-control"
            />
        
            <label
              htmlFor="defaultFormContactMessageEx"
              className="grey-text"
            >
              Your message
            </label>
            <textarea
              type="text"
              id="defaultFormContactMessageEx"
              className="form-control"
              rows="3"
            />
      <button className="btn" style={{backgroundColor: 'red'}}>SEND </button>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        </div>


        <Footer />
      </div>
    );
  }
}

export default Help;
