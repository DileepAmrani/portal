import React from "react";
import { Sidebar, Footer } from "../../Components";
import {
  MDBContainer,
} from "mdbreact";
import { firebaseApp } from "../../Config/Firebase/Firebase.js";
import PieChart from "react-minimal-pie-chart";

import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: true,
      male: 0,
      female: 0,
      g: 0,
      l: 0,
    };
  }
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


  componentDidMount = async() => {
    let male = 0;
    let female = 0
    let g = 0
    let l = 0
  await firebaseApp.firestore().collection("users").get().then((res)=>{
      console.log(res)
      res.forEach(data => {
        if(!data.data().isAdmin){
          console.log(data.data().gender)
          if (data.data().gender === "Male"){
            male = male + 1
          }
          else{
            female = female + 1
          }
        }
      })

    res.forEach(data => {
      if (!data.data().isAdmin) {
        console.log(data.data().gender)
        if (data.data().goal === "L") {
          g = g + 1
        }
        else {
          l = l + 1
        }
      }
    })
    })

    this.setState({
      male: male,
      female: female,
      l: l,
      g: g,
    })
  }

  render() {
    console.log(this.state);
    let {male, female, l, g} =this.state
    return (
      <div className="dashboard-section">
            <Sidebar
              path={this.props.history}
              loginValue="Logout"
              login={this.login}
              logout={this.logout}
            />
            <div>
              <div className="dashboard">
                <h2 className="_heading">Statistics</h2>

                <MDBContainer>
                  <div className="row">
                    <div className="column">
                      <div className="card card-1">
                        {/* <h3>Add User</h3>
                  <p>Add a New User</p> */}
                        <PieChart
                          style={{ width: "80%", margin: "auto" }}
                          data={[
                            { title: "Male", value: male, color: "#01a2fe" },
                            { title: "Female", value: female, color: "#F8007C" }
                          ]}
                        />

                        <div style={{ margin: "5px" }}>
                          <span
                            className="box"
                            style={{
                              width: "10px",
                              height: "5px",
                              backgroundColor: "#01a2fe",
                              color: "#01a2fe"
                            }}
                          >
                            dd
                      </span>
                          <span style={{ color: "#01a2fe", margin: "5px" }}>
                            Male
                      </span>

                          <span
                            className="box"
                            style={{
                              width: "10px",
                              height: "5px",
                              backgroundColor: "#F8007C",
                              color: "#F8007C"
                            }}
                          >
                            dd
                      </span>
                          <span style={{ color: "#F8007C", margin: "5px" }}>
                            Female
                      </span>
                        </div>
                      </div>
                    </div>

                    <div className="column">
                      <div className="card card-2">
                        {/* <h3>Add Trainer</h3>
                    <p>Add a New Trainer</p> */}

                        <PieChart
                          style={{ width: "80%", margin: "auto" }}
                          data={[
                            { title: "G", value: g, color: "#C13C37" },
                            { title: "L", value: l, color: "#E38627" }
                          ]}
                        />

                        <div style={{ margin: "5px" }}>
                          <span
                            className="box"
                            style={{
                              width: "10px",
                              height: "5px",
                              backgroundColor: "#C13C37",
                              color: "#C13C37"
                            }}
                          >
                            dd
                      </span>
                          <span style={{ color: "#C13C37", margin: "5px" }}>
                            G
                      </span>

                          <span
                            className="box"
                            style={{
                              width: "10px",
                              height: "5px",
                              backgroundColor: "#E38627",
                              color: "#E38627"
                            }}
                          >
                            dd
                      </span>
                          <span style={{ color: "#E38627", margin: "5px" }}>
                            L
                      </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </MDBContainer>
              </div>
            </div>
            <Footer />
      </div>
    );
  }
}

export default Dashboard;
