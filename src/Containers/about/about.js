import React from "react";
import { Navbar, Footer } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js.js";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import "./About.css";
class About extends React.Component {
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
      <div className="about-section">
        <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value={this.state.value}
        />
    
        <div className="about">
          <MDBContainer>
            <div className="heading_content">
              <h1>About Us</h1>
              <p>
                My name is Mohamed Abdi (MoFit) and I specialize in
                life-changing transformations. I have helped more than a
                thousands of people around the world gain muscle, lose body fat
                and become stronger and more toned with my online training
                program, which I customize for each of my clients.
              </p>
            </div>

            <MDBRow>
              <MDBCol col="6" md="6">
                <iframe
                title="About Us"
                  width="100%"
                  height="260px"
                  src="https://www.youtube.com/embed/dEpIsOXR_uI"
                  frameborder="1"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </MDBCol >
              <MDBCol col="6"  md="6">
                <h1>Heading Goes Here</h1>
                <p>
                  My name is Mohamed Abdi (MoFit) and I specialize in
                  life-changing transformations. I have helped more than a
                  thousands of people around the world gain muscle, lose body
                  fat and become stronger and more toned with my online training
                  program, which I customize for each of my clients.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>

        <Footer />
      </div>
    );
  }
}

export default About;
