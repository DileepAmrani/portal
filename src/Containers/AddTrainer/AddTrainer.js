import React from "react";
import {Footer, Sidebar } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import "./AddTrainer.css";
import Swal from 'sweetalert2'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Paper from "@material-ui/core/Paper";

class AddTrainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loginValue: "Login",
      trainerID: "",
      trainerName: "",
      error: ""
    };
  }
  componentDidMount = async () => {
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

  // submit form

  handelSubmit = () => {

    if (this.state.trainerName === "" || this.state.trainerID === ""){
      this.setState({
        error: 'Please Fill All Fields'
      })
    }
    else{
      firebaseApp
        .firestore()
        .collection("trainers")
        .add({
          trainerName: this.state.trainerName,
          trainerID: this.state.trainerID,
        })
        .then(function(data) {
          console.log("Document written with ID: ", data);
  
          Swal.fire({
            title: 'Success',
            text: "Trainer Add successfully",
            icon: 'success',
            confirmButtonText: 'Ok'
          })      
        })
        .catch(function(error) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })      
        });
    }


    setTimeout(()=>{
      this.setState({
        error: ''
      })
    }, 3000);
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
            <span>ADD A TRAINER</span>
          </div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <Paper className="_paper">
                  <div className="form">
                    <label htmlFor="defaultFormLoginEmailEx">
                      Enter Trainer ID:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailEx"
                      className="form-control"
                      onChange={this.handelChange}
                      name="trainerID"
                    />
                    <label htmlFor="defaultFormLoginEmailEx">
                      Enter Trainer Name:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailEx"
                      className="form-control"
                      onChange={this.handelChange}
                      name="trainerName"
                    />

                    <button
                      className="btn btn-success"
                      onClick={() => this.handelSubmit()}
                    >
                      Add Trainer
                    </button>
                  <div style={{textAlign: 'center', color: 'red'}}>{this.state.error}</div>
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
