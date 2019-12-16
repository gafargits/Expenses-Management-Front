import React from 'react';

// import { Route } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarText
} from 'reactstrap';

const Navigation = (props) => {


  return (
    <div>
      <Navbar dark color="dark">
        <NavbarBrand href="/">Expenses Management</NavbarBrand>
        <NavbarText><span style={{ fontWeight: "bold" }}>Time:</span> {props.now} </NavbarText>
      </Navbar>
    </div>
  );
}

export default Navigation;