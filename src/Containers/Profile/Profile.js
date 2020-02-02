import React from "react";
import { Navbar, Footer } from "../../Components";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Paper from "@material-ui/core/Paper";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import "./Profile.css";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      dashboard: "",
      user: "",
      update: false
    };
  }

  imageUpload = e => {
    let fileName = e.target.files[0].name;
    let ref = firebaseApp
      .storage()
      .ref("/images")
      .child(`${fileName}`);
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

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  componentDidMount = async () => {
    await firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        let user = localStorage.getItem("user");
        console.log(JSON.parse(user).data.isAdmin);
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
    let user = await localStorage.getItem("user");
    console.log(user);

    if (user) {
      user = JSON.parse(user);
      console.log(user.data);

      this.setState({
        user: user.data,
        dashboard: user.data.dashboard,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        phone: user.data.phone,
        date: user.data.date,
        profileImage: user.data.profileImage,
        userId: user.data.userId,
        gym: user.data.gym,
        trainer: user.data.trainer,
        program: user.data.program,
        gender: user.data.gender,
        goal: user.data.goal
      });
    }
  };

  // handleChange Event

  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state, "here is state");
  };

  // submit form

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
      .catch(error => { });
  };

  updateUser = () => {
    let { firstName,
      lastName,
      gym,
      program,
      trainer,
      gender,
      date,
      email,
      phone,
      profileImage,
      goal } = this.state;
    firebaseApp
      .firestore()
      .collection("users")
      .doc(this.state.userId)
      .update({
        firstName,
        lastName,
        gym,
        program,
        trainer,
        gender,
        date,
        email,
        phone,
        profileImage,
        goal
      })
      .then((user) => {
        console.log("updated", user);
        // localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          update: false
        })

      })
      .catch(error => {
        console.log(error);
      });
  };

  update = () => {
    this.setState({
      update: true
    })
  }

  render() {
    let {
      firstName,
      lastName,
      gym,
      program,
      trainer,
      gender,
      date,
      email,
      phone,
      profileImage,
      goal
    } = this.state;

    console.log(this.state);
    return (
      <div className="profile-section">
        <Navbar
          loginValue={this.state.loginValue}
          login={this.login}
          logout={this.logout}
          path={this.props.history}
          value={this.state.value}
        />
        <div className="profile" style={{color: 'black'}}>
          {!this.state.user ? (
            <div>
              <h1>Please wait data is Loading.....</h1>
              <hr />
            </div>
          ) : this.state.update ? (
            <MDBContainer>
              <Paper
                style={{
                  padding: "50px",
                  backgroundColor: "#f0efef",
                  boxShadow: "none",
                  margin: "30px"
                }}
              >
                <MDBRow>
                  <MDBCol col="6">
                    <div
                      style={{
                        padding: "10px",
                        // textAlign: "center",
                        verticalAlign: "center"
                      }}
                    >
                      <img
                        src={profileImage}
                        width="200px"
                        height="200px"
                        alt="profile"
                        style={{
                          display: "block",
                          borderRadius: "360px",
                          margin: "20px auto",
                          border: "6px solid #28354f"
                        }}
                      />
                      <input
                        type="file"
                        onChange={e => this.imageUpload(e)}
                        style={{
                          // border: "2px solid black",
                          // backgroundColor: "green"
                          width: "100%",

                        }}
                      />
                      <div type="file"></div>
                      <label htmlFor="formGroupExampleInput">First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={firstName}
                        onChange={this.handelChange}
                        name="firstName"
                      />

                      <label htmlFor="formGroupExampleInput">Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={lastName}
                        onChange={this.handelChange}
                        name="lastName"
                      />

                      <label htmlFor="formGroupExampleInput">Gender:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={gender}
                        onChange={this.handelChange}
                        name="gender"
                      />
                    </div>
                  </MDBCol>
                  <MDBCol col="6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Email Address:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={email}
                        onChange={this.handelChange}
                        name="email"
                      />

                      <label htmlFor="formGroupExampleInput">Trainer:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={trainer}
                        onChange={this.handelChange}
                        name="trainer"
                      />

                      <label htmlFor="formGroupExampleInput">Program:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={program}
                        onChange={this.handelChange}
                        name="program"
                      />

                      <label htmlFor="formGroupExampleInput">GYM:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={gym}
                        onChange={this.handelChange}
                        name="gym"
                      />

                      <label htmlFor="formGroupExampleInput">Goal:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={goal}
                        onChange={this.handelChange}
                        name="goal"
                      />
                      <label htmlFor="formGroupExampleInput">
                        Contact Number:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={phone}
                        onChange={this.handelChange}
                        name="phone"
                      />
                      <label htmlFor="formGroupExampleInput">
                        Date of Birth:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={date}
                        onChange={this.handelChange}
                        name="date"
                      />
                      <button
                        className="updateBtn"
                        onClick={() => this.updateUser()}
                      >
                        Update Profile
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </Paper>
            </MDBContainer>
          ) : (
                <MDBContainer>
                  <Paper
                    style={{
                      padding: "50px",
                      backgroundColor: "#f0efef",
                      boxShadow: "none",
                      margin: "30px"
                    }}
                  >
                    <MDBRow>
                      <MDBCol col="6">
                        <div
                          style={{
                            padding: "10px",
                            // textAlign: "center",
                            verticalAlign: "center"
                          }}
                        >
                          <img
                            src={profileImage}
                            alt="profile"
                            width="200px"
                            height="200px"
                            style={{
                              display: "block",
                              borderRadius: "360px",
                              margin: "20px auto",
                              border: "6px solid #28354f"
                            }}
                          />


                          <label htmlFor="formGroupExampleInput">First Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={firstName}
                            onChange={this.handelChange}
                            name="firstName"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">Last Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={lastName}
                            onChange={this.handelChange}
                            name="lastName"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">Gender:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={gender}
                            onChange={this.handelChange}
                            name="gender"
                            disabled
                          />
                        </div>
                      </MDBCol>
                      <MDBCol col="6">
                        <div className="form-group">
                          <label htmlFor="formGroupExampleInput">
                            Email Address:
                      </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={email}
                            onChange={this.handelChange}
                            name="email"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">Trainer:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={trainer}
                            onChange={this.handelChange}
                            name="trainer"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">Program:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={program}
                            onChange={this.handelChange}
                            name="program"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">GYM:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={gym}
                            onChange={this.handelChange}
                            name="gym"
                            disabled
                          />

                          <label htmlFor="formGroupExampleInput">Goal:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={goal}
                            onChange={this.handelChange}
                            name="goal"
                            disabled
                          />
                          <label htmlFor="formGroupExampleInput">
                            Contact Number:
                      </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={phone}
                            onChange={this.handelChange}
                            name="phone"
                            disabled
                          />
                          <label htmlFor="formGroupExampleInput">
                            Date of Birth:
                      </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            value={date}
                            onChange={this.handelChange}
                            name="date"
                            disabled
                          />
                          <button
                            className="_updateBtn"
                            onClick={() => this.update()}
                          >
                            Edit Profile
                      </button>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </Paper>
                </MDBContainer>
              )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
