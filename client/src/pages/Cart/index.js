import React, {useEffect} from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {UPDATE_CART_LIST, LOADING, REMOVE_PRODUCT} from "../../utils/actions";
import {useStoreContext} from "../../utils/GlobalState";
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () =>{
    const [state,dispatch] = useStoreContext();

    const getCartList = () =>{
        dispatch({type: LOADING});
        dispatch({type: UPDATE_CART_LIST});
    };

    const removeFromCart = sku =>{
        API.removeProduct(sku)
        .then(()=>{
            dispatch({
                type: REMOVE_PRODUCT,
                sku: sku
            });
        }).catch(err =>{
            console.log(err);
        });
    }

    useEffect(()=>{
        getCartList();
    },[]);

    return(
        <div>
            {state.cartList.length ? (
                <Container className="mb-5">
                    <Table className="mt-3" bordered hover responsive>
                        <thead>
                            <tr>
                                <th colSpan="3" className="text-center">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.cartList.map((product,index) => (
                                <tr key={index}>
                                    <td className="align-middle">
                                        <img
                                            height={100}
                                            src={product.thumbnail_url}
                                            alt={product.title}
                                        />
                                    </td>
                                    <td className="align-middle" colSpan="2"><Link to={"/product/" + product.sku}>{product.title}</Link></td>
                                    <td className="align-middle"><h5>${product.price}</h5></td>
                                    <td className="align-middle"><input className="table-item" value={1}></input></td>
                                    <td className="align-middle"><Button variant="danger" className="mx-auto remove-btn" onClick={()=>removeFromCart(product.sku)}>X</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="success" size="lg">Checkout</Button>
                </Container>
            ):(
                <h3 className="text-center mt-5">Your cart is empty!</h3>
            )}
        </div>
    );
};

export default Cart;