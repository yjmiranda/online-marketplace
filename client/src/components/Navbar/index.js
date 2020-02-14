import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

const myNavbar = () =>{
    return (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Marketplace<small> (powered by Best Buy)</small> </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/cart">Cart</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
    );
};

export default myNavbar;