import React from "react";
import SideNav  from "react-simple-sidenav";
import "./Sidebar.css";
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
      showNav: false
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
              {/* <p>Admin Mofit</p> */}
              <div>

                {this.props.loginValue === "Login" ? (
                  <>
                    <IoMdLogIn size={25} />
                    <span onClick={() => this.props.login()} > {this.props.loginValue}</span>
                  </>
                ) : (
                    <span style={{ cursor: "pointer" }}>
                      <IoMdLogOut size={25} />
                      <span onClick={() => this.props.logout()} > {this.props.loginValue}</span>
                    </span>
                  )}
              </div>
            </div>
            <hr style={{ backgroundColor: "white" }} />
            <ul>
              <FiUserPlus size={25} />
              <span>Admin</span>
              <li
                onClick={() => this.props.path.push("/dashboard")}
              >
                Company info
              </li>
              <li
                onClick={() => this.props.path.push("/add-trainer")}
              >
                Add Trainer
              </li>
              <li
                onClick={() => this.props.path.push("/add-program")}
              >
                Add Program
              </li>
              <li
                onClick={() => this.props.path.push("/add-gym")}
              >
                Add GYM
              </li>
            </ul>
            <ul>
              <MdLocalLaundryService size={25} />
              <span>Services</span>
              <li
                onClick={() => this.props.path.push("#")}
              >
                New Member
              </li>
              <li
                onClick={() => this.props.path.push("/#")}
              >
                Meet Plan
              </li>
            </ul>
            <ul>
              <FiActivity size={25} />
              <span>Activity</span>
              <li
                onClick={() => this.props.path.push("#")}
              >
                Receipt
              </li>
            </ul>
            <ul>
              <MdReport size={25} />
              <span style={{ cursor: 'pointer' }} onClick={() => this.props.path.push("#")}>Reports</span>
            </ul>
            <ul>
              <IoMdSettings size={25} />
              <span>Setting</span>
              <li
                onClick={() => this.props.path.push("/add-user")}
              >
                Create user
              </li>
            </ul>

            <ul>
              <IoMdInformationCircleOutline size={25} />
              <span
                onClick={() => this.props.path.push("/about")}
              >About us</span>
            </ul>
          </div>
        </SideNav>
      </>
    );
  }
}

export default Sidebar;
