import React, {useEffect} from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
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
                <Container>
                    <ul className="list-unstyled mt-5">
                        {state.cartList.map((product,index) => (
                            <Media as="li" className="border" key={index}>
                                <img
                                    height={100}
                                    src={product.thumbnail_url}
                                    className="my-3 mr-2"
                                    alt={product.title}
                                />
                                <Media.Body>
                                    <div className="row">
                                        <div className="col-12 col-lg-11">
                                            <h5 className="text-center"><Link to={"/product/" + product.sku}>{product.title}</Link></h5>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="col-12 col-lg-1">
                                            <Button variant="danger" className="mx-auto mt-0 mt-lg-5 remove-btn" onClick={()=>removeFromCart(product.sku)}>X</Button>
                                        </div>
                                    </div>
                                </Media.Body>
                            </Media>
                        ))}
                    </ul>
                    <Button variant="success" size="lg">Checkout</Button>
                </Container>
            ):(
                <h3 className="text-center mt-5">Your cart is empty!</h3>
            )}
        </div>
    );
};

export default Cart;