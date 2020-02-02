import React from "react";
import { Navbar, Footer } from "../../Components";
import { MDBRow, MDBCol } from "mdbreact";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "./Login.css";
import Logo from "./../../Images/logo.png";
import { Link } from "@material-ui/core";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: {}
    };
  }

   login = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user.user);
        firebaseApp
          .firestore()
          .collection("users")
          .where("email", "==", user.user.email)
          .get()
          .then(querySnapshot => {
            console.log(querySnapshot);
            if (!querySnapshot.empty) {
              querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                let data = doc.data();
                data.userId = doc.id;
                console.log(data);
                if (data.isLogin && data.isAdmin) {
                  let user = {
                    data,
                    dashboard: "profile"
                  };
                  console.log(user)
                  localStorage.setItem("user", JSON.stringify(user));
                  this.props.history.push("/dashboard");
                  window.location.reload();
                }

                if (data.isLogin && !data.isAdmin) {
                  let user = {
                    data,
                    dashboard: "profile"
                  };
                  console.log(user)
                  localStorage.setItem("user", JSON.stringify(user));
                  this.props.history.push("/profile");
                  window.location.reload();
                }
              });
            } 
          });
      })
      .catch((error)=> {
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
       this.setState({
         error:errorMessage
       })
      });
  };

  componentDidMount() {
    var isAdmin = false;

    if (isAdmin) {
      //   this.props.history.push("/dashboard");
      let menu = {
        item1: "Dashboard",
        item2: "Logout"
      };
      this.setState({
        menu
      });
    } else {
      //   this.props.history.push("/Profile");
      let menu = {
        item1: "Profile",
        item2: "Logout"
      };
      this.setState({
        menu
      });
    }
  }

  render() {
    return (
      <div>
        {/* <Navbar menu={this.state.menu} /> */}

        <div className="login-section">
          <Navbar path={this.props.history} />
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
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="inputs"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <div style={{ marginTop: "30px" }}>
                      <MDBRow center>
                        <MDBCol lg={6}>
                          <p className="forgot-link">
                            Forgot your
                            <Link to="/rest-password" 
                              onClick={() => this.props.history.push("/rest-password")}
                            style={{ color: "blue" }}>

                              &nbsp; password?
                            </Link>
                          </p>
                        </MDBCol>
                        <MDBCol lg={6}>
                          <Button
                            style={{
                              backgroundColor: "#202020",
                              color: "#fff",
                              width: "50%",
                              marginLeft: "30%"
                              // marginLeft:"70%"
                            }}
                            onClick={() => this.login()}
                          >
                            SUBMIT
                          </Button>
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <div className="error">
                      <span onClick={() => this.setState({ error: "" })}>
                        {this.state.error}
                      </span>
                    </div>
                  </div>
                </Paper>
              </MDBCol>
            </MDBRow>
          </Grid>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Login;
