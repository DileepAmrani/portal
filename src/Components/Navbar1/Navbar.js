import React from "react";
class Navbar extends React.Component {
  render() {
    return (
      <ul>
        <li>Home</li>
        <li>{this.props.menu && this.props.menu.item1}</li>
        <li>{this.props.menu && this.props.menu.item2}</li>
        <li>About</li>
        <li>contact</li>

        <li>{this.props.login}</li>
      </ul>
    );
  }
}

export default Navbar;
