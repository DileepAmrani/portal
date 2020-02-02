import React from "react";
import { Sidebar, Footer } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import "./AddGym.css";
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
      gymID: "",
      gymName: "",
      gymAddress: "",
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

  handelSubmit = async() => {
    console.log(this.state);
    let that = this
    
    if (this.state.gymName === "" || this.state.gymID === "" || this.state.gymAddress === "") {
      this.setState({
        error: 'Please Fill All Fields'
      })
    }
    else {
      await  firebaseApp
         .firestore()
         .collection("gym")
         .add({
           gymName: this.state.gymName,
           gymID: this.state.gymID  
         })
         .then(data =>{
           console.log("Document written with ID: ", data);
           that.setState({
             gymID: "",
             gymName: "",
             gymAddress: ""
           });
           Swal.fire({
             title: 'Success',
             text: "Gym Add successfully",
             icon: 'success',
             confirmButtonText: 'Ok'
           })  
         })
         .catch(error => {
           console.error("Error adding document: ", error);
           this.setState({
             error: "Data not Sent Successfully"
           });
         });
      
    }


    setTimeout(() => {
      this.setState({
        error: ''
      })
    }, 3000);
  };
  render() {
    return (
      <div className="add_trainer_section">
        <Sidebar
          path={this.props.history}
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
        />

        <div className="add_trainer">
          <div className="top_heading">
            <span>ADD A NEW GYM</span>
          </div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <Paper className="_paper">
                  <div className="form">
                    <label htmlFor="defaultFormLoginEmailEx">
                      Enter GYM ID:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailEx"
                      className="form-control"
                      onChange={this.handelChange}
                      name="gymID"
                    />
                    <label htmlFor="defaultFormLoginEmailE">
                      Enter GYM Name:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmailE"
                      className="form-control"
                      onChange={this.handelChange}
                      name="gymName"
                    />

                    <label htmlFor="defaultFormLoginEmail">
                      Enter GYM Address:
                    </label>
                    <input
                      type="text"
                      id="defaultFormLoginEmail"
                      className="form-control"
                      onChange={this.handelChange}
                      name="gymAddress"
                    />

                    <button className="btn btn-success" onClick={this.handelSubmit}>Add GYM</button>
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
