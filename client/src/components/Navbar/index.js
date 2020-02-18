import React , {useRef, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useStoreContext} from "../../utils/GlobalState";
import {UPDATE_PRODUCT_LIST, SET_SEARCH_TERM, LOADING} from "../../utils/actions";
import API from "../../utils/API"
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";

const MyNavbar = () => {
  const [state,dispatch] = useStoreContext();
  const searchRef = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = () =>{
    dispatch({type: LOADING});

    API.searchProduct(searchRef.current.value)
        .then(res =>{
            dispatch({
                type: UPDATE_PRODUCT_LIST,
                productList: res.data
            });
            dispatch({
              type: SET_SEARCH_TERM,
              searchTerm: searchRef.current.value
            });
            searchRef.current.value = "";
        }).catch(err =>{
            console.log(err);
        });
  }
    return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link className="navbar-brand" to="/home">Marketplace<small> (powered by Best Buy)</small> </Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/cart">Cart</Link>
          <span className="nav-link pointer" onClick={handleShow}>Login</span>
        </Nav>
        <Form onSubmit={e=>{e.preventDefault();}} inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={searchRef}/>
          <Link to="/home"><Button variant="outline-info" onClick={()=>handleSearch()}>Search</Button></Link>
        </Form>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Form className="py-3 px-3">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
    );
};

export default MyNavbar;