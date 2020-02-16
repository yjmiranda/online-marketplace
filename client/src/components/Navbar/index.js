import React , {useRef} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useStoreContext} from "../../utils/GlobalState";
import {UPDATE_PRODUCT_LIST, SET_SEARCH_TERM, LOADING} from "../../utils/actions";
import API from "../../utils/API"
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = () => {
  const [state,dispatch] = useStoreContext();
  const searchRef = useRef();

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
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/home">Marketplace<small> (powered by Best Buy)</small> </Navbar.Brand>
    <Nav className="mr-auto">
      <Link className="nav-link" to="/home">Home</Link>
      <Link className="nav-link" to="/cart">Cart</Link>
      <Link className="nav-link" to="/login">Login</Link>
    </Nav>
    <Form onSubmit={e=>{e.preventDefault();}} inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={searchRef}/>
      <Link to="/home"><Button variant="outline-info" onClick={()=>handleSearch()}>Search</Button></Link>
    </Form>
  </Navbar>
    );
};

export default MyNavbar;