import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Navbar, Footer} from "../../Components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./ForgetPassword.css";
import Logo from "./../../Images/logo.png";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
class ForgetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: true,
      loginValue: "Login",
      func: "login",
      value: undefined,
      error: "",
      email: ""
    };
  }

  componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        let user = localStorage.getItem("user")
        console.log(JSON.parse(user).data.isAdmin)
        if (JSON.parse(user).data.isAdmin) {
          this.setState({ loginValue: "Logout", func: "logout", value: "dashboard" });
        }
        else {
          this.setState({ loginValue: "Logout", func: "logout", value: "Profile" });
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
      .catch(error => { });
  };

  render() {
    return (
      <div className="login-section">
        <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value={this.state.value}
        />
        <Grid>
          <MDBRow center>
            <MDBCol md="5">
              <Paper>
                  <p className="login_heading">Login</p>
                  <div className="login-form">
                  <img src={Logo} width="150px" alt="logo"/>
                   <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="inputs"
                    onChange={e => this.setState({ email: e.target.value })}
                  />

                  <div style={{marginTop:"30px"}}>
                  <MDBRow center>
                        <MDBCol  lg={6}>
                  <Button
                    style={{
                      backgroundColor: "#202020",
                      color: "#fff",
                      width: "70%",
                      // marginLeft:"70%"
                    }}
                    onClick={() => this.login()}>
                    Rest password
                  </Button>
                  </MDBCol>
                  </MDBRow>
                  </div>
                  <div className="error">
                    <span onClick={() => this.setState({ error: '' })}>{this.state.error} </span>
                  </div>
                </div>
              </Paper>
            </MDBCol>
          </MDBRow>
        </Grid>
        <br />
        <br />
        <Footer />

      </div>
    );
  }
}

export default ForgetPassword;
