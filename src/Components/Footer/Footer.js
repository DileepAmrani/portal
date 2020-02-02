import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./Footer.css";
class Footer extends React.Component {
  render() {
    return (
      <div>

      <div className="footer">
        <MDBRow>
          <MDBCol md="4">
            <span className="heading"></span>
          </MDBCol>
          <MDBCol md="3">
            <span className="heading">Contact</span>
              <span className="contact-detail">+31 6 22907050</span>
              <span className="contact-detail">coachmofit@gmail.com</span>
          </MDBCol>
          <MDBCol md="4">
            <span className="heading">About</span>
              <p>My name is Mohamed Abdi (MoFit) and I specialize in life-changing transformations. I have helped more than a thousands of people around the world gain muscle, lose body fat and become stronger and more toned with my online training program, which I customize for each of my clients.</p>
          </MDBCol>
        </MDBRow>
      </div>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mofit.com">All rights reserved by coachmofit </a>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Footer;
