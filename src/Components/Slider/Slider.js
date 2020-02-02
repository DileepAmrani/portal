import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";

import {
    imageOne,
    imageTwo,
    imageThree,
    imageFour
} from '../../Images/index.js'

const content = [
  {
    title: "Have mofit As Your Coach",
    description:
"One of the fitness world’s top body transformation coaches & has helped over 20,000 people.",
    image: imageOne
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    image: imageTwo
  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    image: imageThree
  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
    image: imageFour
  }
];

const slider = (props) => (
    
    <Slider className={props.className}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{height: `100%`}}  

        >
          <img src={item.image} height='600px' width="100%" alt="slide"/>
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
);

export default slider;