import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logo from "./../../Images/logo.png";
import "./Navbar.css";
class Navbar extends Component {
  state = {
    isOpen: false,
    name: ""
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };


  render() {
    return (
      <Router>
        <div className="navbar-section">
          <MDBNavbar dark className="navbar" expand="md">
            <MDBNavbarBrand>
              <strong className="white-text">
                <img src={Logo} alt="Mofit Fitness" width="150px" />
              </strong>
            </MDBNavbarBrand>

            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav right>


                <MDBNavItem className="navItems">
                  <Link
                    to="/"
                    className="span"
                    onClick={() => this.props.path.push("/")}
                  >
                    Home
                  </Link>
                </MDBNavItem>
                <MDBNavItem className="navItems">
                  {this.props.loginValue === "Logout" ? (
                    this.props.value && (
                      <Link
                        to={this.props.value}
                        className="span"
                        onClick={() => this.props.path.push(this.props.value)}
                      >
                        {this.props.value}
                      </Link>
                    )
                  ) : (
                    <></>
                  )}
                </MDBNavItem>
                <MDBNavItem className="navItems">
                  <Link
                    to="/helpandsupport"
                    onClick={() => this.props.path.push("/helpandsupport")}
                    className="span"
                  >
                    Suport & Help
                  </Link>
                </MDBNavItem>
                <MDBNavItem className="navItems">
                  <Link
                    to="/about"
                    onClick={() => this.props.path.push("/about")}
                    className="span"
                  >
                    About Us
                  </Link>
                </MDBNavItem>
                <MDBNavItem className="navItems">
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>

                      {this.props.loginValue === "Login" ? (
                        <MDBDropdownItem onClick={() => this.props.login()}>
                          {this.props.loginValue}
                        </MDBDropdownItem>
                      ) : (
                        <MDBDropdownItem onClick={() => this.props.logout()}>
                          {this.props.loginValue}
                        </MDBDropdownItem>
                      )}

                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </div>
      </Router>
    );
  }
}

export default Navbar;
