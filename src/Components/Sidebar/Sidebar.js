import React from "react";
import SideNav from "react-simple-sidenav";
import "./Sidebar.css";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import {
  MdViewHeadline,
  MdAccountCircle,
  MdReport,
  MdLocalLaundryService
} from "react-icons/md";
import {
  IoMdSettings,
  IoMdInformationCircleOutline,
  IoMdLogOut,
  IoMdLogIn
} from "react-icons/io";
import { FiActivity, FiUserPlus } from "react-icons/fi";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      showNav: true,
      showAdmin: false,
      showServices: false,
      showActivity: false
    };
  }
  render() {
    return (
      <>
        <MdViewHeadline
          onClick={() => this.setState({ showNav: true })}
          className="manue_icon"
        />

        <SideNav
          className="_sidebar"
          navStyle={{
            backgroundColor: "#202020",
            width: "270px",
            color: "white"
          }}
          showNav={this.state.showNav}
          onHideNav={() => this.setState({ showNav: false })}
        >
          <div className="_innerItem">
            <div className="siderbar_header">
              <MdAccountCircle className="user_icon" />
              <div>
                {this.props.loginValue === "Login" ? (
                  <>
                    <IoMdLogIn size={25} />
                    <span onClick={() => this.props.login()}>
                      {this.props.loginValue}
                    </span>
                  </>
                ) : (
                  <span style={{ cursor: "pointer" }}>
                    <IoMdLogOut size={25} />
                    <span onClick={() => this.props.logout()}>
                      {this.props.loginValue}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <hr style={{ backgroundColor: "white" }} />

            <div className="sidenav">
              <button
                class="dropdown-btn"
                onClick={() =>
                  this.setState({
                    showAdmin: !this.state.showAdmin,
                    showServices: false,
                    showActivity: false,
                    showServices: false
                  })
                }
              >
                <FiUserPlus size={25} />
                <span>Admin</span>
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-containe">
                {this.state.showAdmin ? (
                  <ul>
                    <li onClick={() => this.props.path.push("/dashboard")}>
                      Company info
                    </li>
                    <li onClick={() => this.props.path.push("/add-trainer")}>
                      Add Trainer
                    </li>
                    <li onClick={() => this.props.path.push("/add-program")}>
                      Add Program
                    </li>
                    <li onClick={() => this.props.path.push("/add-gym")}>
                      Add GYM
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
              <button
                class="dropdown-btn"
                onClick={() =>
                  this.setState({
                    showServices: !this.state.showServices,
                    showActivity: false,
                    showAdmin: false,
                    showSetting: false
                  })
                }
              >
                <MdLocalLaundryService size={25} />
                <span>Services</span>
                <i class="fa fa-caret-down"></i>
              </button>
              <div>
                {this.state.showServices ? (
                  <ul>
                    <li onClick={() => this.props.path.push("#")}>
                      New Member
                    </li>
                    <li onClick={() => this.props.path.push("/#")}>
                      Meet Plan
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
              <button
                class="dropdown-btn"
                onClick={() =>
                  this.setState({
                    showActivity: !this.state.showActivity,
                    showServices: false,
                    showAdmin: false,
                    showSetting: false
                  })
                }
              >
                <FiActivity size={25} />
                <span>Activity</span>
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-containe">
                {this.state.showActivity ? (
                  <ul>
                    <li onClick={() => this.props.path.push("#")}>Receipt</li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
              <button class="dropdown-btn">
                <MdReport size={25} />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.path.push("#")}
                >
                  Reports
                </span>
              </button>
              <button
                class="dropdown-btn"
                onClick={() =>
                  this.setState({
                    showSetting: !this.state.showSetting,
                    showActivity: false,
                    showAdmin: false,
                    showServices: false
                  })
                }
              >
                <IoMdSettings size={25} />
                <span>Setting</span>
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-containe">
                {this.state.showSetting ? (
                  <ul>
                    <li onClick={() => this.props.path.push("/add-user")}>
                      Create user
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>

              <button class="dropdown-btn">
                <IoMdInformationCircleOutline size={25}/>
                <span onClick={() => this.props.path.push("/about")}>
                  About us
                </span>
              </button>
            </div>

          </div>
        </SideNav>
      </>
    );
  }
}

export default Sidebar;
