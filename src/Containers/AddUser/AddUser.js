import React from "react";
import { Footer, Sidebar } from "../../Components";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import Button from "@material-ui/core/Button";
import "./AddUser.css";
import Paper from "@material-ui/core/Paper";
import Swal from 'sweetalert2'

import {
  MDBRow,
  MDBCol,
  MDBModalBody,
} from "mdbreact";
class AddUser extends React.Component {
  constructor() {
    super();
    this.state = {
      loginValue: "Login",
      profileImage:
        "https://tribunest.com/wp-content/uploads/2019/02/dummy-profile-image-200x200.png",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      program: "",
      gym: "",
      goal: "",
      password: "",
      phone: "",
      date: "",
      trainer: "",
      isAdmin: false,
      programs: [],
      trainers: [],
      gyms: []
    };
  }

  imageUpload = e => {
    let fileName = e.target.files[0].name;
    let ref = firebaseApp
      .storage()
      .ref("/")
      .child(`images/${fileName}`);
    let imagePut = ref.put(e.target.files[0]);
    imagePut.on("state_changed", () => {
      ref
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.setState({
            profileImage: url
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  componentDidMount = async () => {
    let alluser = [];
    let program = [];
    let trainer = [];
    let gym = [];
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

    await firebaseApp
      .firestore()
      .collection("users")
      .get()
      .then(res => {
        console.log(res);
        res.forEach(v => {
          let data = v.data();
          if (!data.isAdmin) {
            alluser.push(data);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      allusers: alluser
    });

    await firebaseApp
      .firestore()
      .collection("programs")
      .get()
      .then(res => {
        console.log(res);
        res.forEach(v => {
          program.push(v.data().programName);
        });
      });
    this.setState({
      programs: program
    });

    await firebaseApp
      .firestore()
      .collection("trainers")
      .get()
      .then(res => {
        console.log(res);
        res.forEach(v => {
          trainer.push(v.data().trainerName);
        });
      });
    this.setState({
      trainers: trainer
    });

    await firebaseApp
      .firestore()
      .collection("gym")
      .get()
      .then(res => {
        console.log(res);
        res.forEach(v => {
          gym.push(v.data().gymName);
        });
      });
    this.setState({
      gyms: gym
    });
  };

  // handleChange Event

  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state, "here is state");
  };

  // submit form

  handelSubmit = async () => {




    if (this.state.firstName === "" || this.state.lastID === "" || this.state.email === "" || this.state.password === "" ) {
      this.setState({
        error: 'Please Fill All Required Fields'
      })
    }
    else {

      await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebaseApp
            .firestore()
            .collection("users")
            .add({
              profileImage: this.state.profileImage,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password,
              isLogin: this.state.isLogin,
              phone: this.state.phone,
              date: this.state.date,
              gender: this.state.gender,
              program: this.state.program,
              gym: this.state.gym,
              trainer: this.state.trainer,
              goal: this.state.goal
            })
            .then(function(data) {
              Swal.fire({
                title: 'Success',
                text: "User Add successfully",
                icon: 'success',
                confirmButtonText: 'Ok'
              }) 
              console.log("Document written with ID: ", data);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        })
        .catch(function(error) {
          // var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }



    setTimeout(() => {
      this.setState({
        error: ''
      })
    }, 3000);
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

  gender = e => {
    this.setState({ gender: e.target.value });
  };
  program = e => {
    this.setState({ program: e.target.value });
  };
  gym = e => {
    this.setState({ gym: e.target.value });
  };
  trainer = e => {
    this.setState({ trainer: e.target.value });
  };
  goal = e => {
    this.setState({ goal: e.target.value });
  };
  render() {
    console.log(this.state);
    return (
      <div className="add_trainer_section">
        <Sidebar
          path={this.props.history}
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
        />

        {/* Add a New user form  */}
        <div className="add_trainer">
          <div className="top_heading">
            <span>ADD A USER</span>
          </div>
          <div>
            <MDBModalBody>
              <div>
                <MDBRow>
                  <MDBCol md="12" style={{padding: '0px'}}>
                    <Paper className="_paper">
                      <div className="form">
                        <MDBRow center>
                          <MDBCol md="6">
                            <MDBRow center>
                              <MDBCol md="4">
                                <div>
                                  <img
                                    src={this.state.profileImage}
                                    className="profileDiv"
                                    alt="profile"
                                  />
                                  <input
                                    type="file"
                                    onChange={e => this.imageUpload(e)}
                                    style={{
                                      width: "100%",
                                      color: "red",
                                      backgroundColor: "#fff"
                                    }}
                                  />
                                </div>
                              </MDBCol>
                            </MDBRow>
                            <label htmlFor="defaultFormLoginEmailEx">
                              First Name  <span style={{color:'red'}}>*</span>
                            </label>
                            <input
                              type="text"
                              id="defaultFormLoginEmailEx"
                              className="form-control"
                              onChange={this.handelChange}
                              name="firstName"
                            />
                            <label htmlFor="defaultFormLoginEmailEx">
                              Last Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              type="text"
                              id="defaultFormLoginEmailEx"
                              className="form-control"
                              onChange={this.handelChange}
                              name="lastName"
                            />

                            <div>
                              <label htmlFor="defaultFormLoginEmailEx">
                                Settings
                              </label>
                              <MDBRow>
                                <MDBCol md="6">
                                  <input
                                    type="checkbox"
                                    onClick={() => {
                                      this.setState({
                                        isLogin: !this.state.isLogin
                                      });
                                    }}
                                  />

                                  <label htmlFor="defaultFormLoginEmailEx">
                                    Enable Client to Login
                                  </label>
                                </MDBCol>
                                <MDBCol md="6">
                                  <input type="checkbox" />
                                  <label htmlFor="defaultFormLoginEmailEx">
                                    Send Welcome Email
                                  </label>
                                </MDBCol>
                              </MDBRow>

                              <label htmlFor="defaultFormLoginEmailEx">
                                Client Email <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="email"
                                id="defaultFormLoginEmailEx"
                                className="form-control"
                                onChange={this.handelChange}
                                name="email"
                              />
                              <label htmlFor="defaultFormLoginPasswordEx">
                                Password <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="password"
                                id="defaultFormLoginPasswordEx"
                                className="form-control"
                                onChange={this.handelChange}
                                name="password"
                              />
                            </div>

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Phone(Optional)
                            </label>
                            <input
                              id="defaultFormLoginPasswordEx"
                              className="form-control"
                              type="tel"
                              name="phone"
                              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                              onChange={this.handelChange}
                            />

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Date of Birth(Optional)
                            </label>
                            <input
                              type="date"
                              id="defaultFormLoginPasswordEx"
                              className="form-control"
                              onChange={this.handelChange}
                              name="date"
                            />

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Select Gender
                            </label>
                            <select
                              className="browser-default custom-select"
                              value={this.state.selectValue}
                              onChange={this.gender}
                            >
                              <option value="none">Select your Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Select a Program
                            </label>
                            <select
                              className="browser-default custom-select"
                              value={this.state.selectValue}
                              onChange={this.program}
                            >
                              <option value="none">Select a Program</option>
                              {this.state.programs.map((v, i) => {
                                return <option value={v} key={i}>{v}</option>;
                              })}
                            </select>

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Select a Trainer
                            </label>
                            <select
                              className="browser-default custom-select"
                              value={this.state.selectValue}
                              onChange={this.trainer}
                            >
                              <option  value="none">Select a Trainer</option>
                              {this.state.trainers.map((v, i) => {
                                return <option value={v} key={i}>{v}</option>;
                              })}
                            </select>

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Select a GYM
                            </label>
                            <select
                              className="browser-default custom-select"
                              value={this.state.selectValue}
                              onChange={this.gym}
                            >
                              <option value="none">Select a GYM</option>
                              {this.state.gyms.map((v, i) => {
                                return <option value={v} key={i}>{v}</option>;
                              })}
                            </select>

                            <label htmlFor="defaultFormLoginPasswordEx">
                              Select Your Goal
                            </label>
                            <select className="browser-default custom-select"
                              value={this.state.selectValue}
                              onChange={this.goal}
                            >
                              <option value="none">Select Your Goal</option>
                              <option value="G">G</option>
                              <option value="L">L</option>
                            </select>

                            <Button
                              style={{
                                backgroundColor: "rgb(40, 53, 79)",
                                color: "#fff",
                                width: "90%",
                                margin: "30px"
                              }}
                              onClick={() => this.handelSubmit()}
                            >
                              Submit Data
                            </Button>

                            <div style={{textAlign: 'center', color: 'red'}}>{this.state.error}</div>

                          </MDBCol>
                        </MDBRow>
                      </div>
                    </Paper>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddUser;
