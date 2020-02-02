import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./About.css";
class AboutCoach extends React.Component {
  render() {
    return (
      <div className="about_coach">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <iframe
                title="about"
                width="100%"
                height="260px"
                src="https://www.youtube.com/embed/dEpIsOXR_uI"
                frameborder="1"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </MDBCol>
            <MDBCol md="6">
              <h1 className="heading">Coach Mofit</h1>
              <h3 className="heading">Nutrition And Fitness</h3>
              <p style={{ textAlign: "justify" }}>
                My name is Mohamed Abdi (MoFit) and I specialize in
                life-changing transformations. I have helped more than thousands
                people around the world gaining muscle, lose body fat, becoming
                stronger and more toned with my online training program, which I
                customize for each of my clients.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default AboutCoach;
