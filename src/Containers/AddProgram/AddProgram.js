import React from "react";
import { Navbar, Sidebar, Footer } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import "./AddProgram.css";
import Swal from 'sweetalert2'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBFormInline,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import Paper from "@material-ui/core/Paper";

class AddTrainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loginValue: "Login",
      programID: "",
      programName: "",
      message:""
    };
  }
  componentDidMount = async () => {
    let alluser = [];
    await firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        let user = localStorage.getItem("user");
        if (JSON.parse(user).data.isAdmin) {
          this.setState({
            loginValue: "Logout",
            func: "logout",
            value: "Dashboard"
          });
        } else {
          this.setState({
            loginValue: "Logout",
            func: "logout",
            value: "Profile"
          });
        }
      } else {
        this.setState({ loginValue: "login", func: "login" });
        this.props.history.push("/login");
      }
    });
  };

  login = () => {
    this.props.histroy.push("/login");
  };
  logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.props.history.push("/login");
      })
      .catch(error => {});
  };

  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state, "here is state");
  };

  handelSubmit = () => {
    let that = this
    firebaseApp.firestore()
        .collection("programs")
        .add({
            programName: this.state.programName,
            programID: this.state.programID
        })
        .then(function (data) {
            console.log("Document written with ID: ", data);
            that.setState({
              message: "Data Sent Successfully",
              programID: "",
              programName: "",
            })
            Swal.fire({
              title: 'Success',
              text: "Program Add successfully",
              icon: 'success',
              confirmButtonText: 'Ok'
            })  

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
          this.setState({
            message: "Data Sent Successfully",
          })
        });
  };

  render() {
    return (
      <div className="add_trainer_section">
        {/* <Navbar
                    loginValue={this.state.loginValue}
                    login={this.login}
                    logout={this.logout}
                    path={this.props.history}
                    value={this.state.value}
                /> */}

        <Sidebar
          path={this.props.history}
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
        />
        <div className="add_trainer">
          <div className="top_heading">
            <span>ADD A PROGRAM</span>
          </div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <Paper className="_paper">
                  <div className="form">
                    <label htmlFor="defaultFormLoginEmailEx">
                      Enter Program ID:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailEx"
                      className="form-control"
                      onChange={this.handelChange}
                      name="programID"
                    />
                    <label htmlFor="defaultFormLoginEmailEx">
                      Enter Program Name:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailEx"
                      className="form-control"
                      onChange={this.handelChange}
                      name="programName"
                    />

                    <button
                      className="btn btn-success"
                      onClick={() => this.handelSubmit()}
                    >
                      Add Program
                    </button>
                  </div>
                  <div className="_error">
                    <span onClick={() => this.setState({ message: "" })}>
                      {this.state.message}
                    </span>
                  </div>
                </Paper>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>

        <Footer />
      </div>
    );
  }
}

export default AddTrainer;
