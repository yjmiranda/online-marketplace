import React, {useEffect} from "react";
import {SET_CURRENT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT, LOADING} from "../../utils/actions";
import {useStoreContext} from "../../utils/GlobalState";
import API from "../../utils/API";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Product.css";

const Product = (props) =>{
    const [state,dispatch] = useStoreContext();
    // console.log(state.currentProduct);
    // console.log(state.cartList);

    const getProductInfo = () => {
        dispatch({type: LOADING});
        API.getProductInfo(props.match.params.sku)
            .then(result =>{
                var source;
                if(result.data.source = "null"){
                    source = "Best Buy";
                } else{
                    source = result.data.source;
                }
                dispatch({
                    type: SET_CURRENT_PRODUCT,
                    product: {
                        sku: result.data.sku,
                        title: result.data.name,
                        seller: source,
                        price: result.data.regularPrice,
                        description: result.data.longDescription,
                        thumbnail_url: result.data.image
                    }
                });
            }).catch(err=>{
                console.log(err);
            });
    };

    const addToCart = () => {
        API.addProduct(state.currentProduct)
            .then(()=>{
                dispatch({
                    type: ADD_PRODUCT,
                    product: state.currentProduct
                });
            }).catch(err =>{
                console.log(err);
            });
    };

    const removeFromCart = () => {
        API.removeProduct(state.currentProduct.sku)
            .then(()=>{
                dispatch({
                    type: REMOVE_PRODUCT,
                    sku: state.currentProduct.sku
                });
            }).catch(err =>{
                console.log(err);
            });
    };

    const checkCartList = () => {
        for(let i = 0; i < state.cartList.length; i++){
            if(state.currentProduct.sku === state.cartList[i].sku){
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        getProductInfo();
    },[]);

    return(
        <div className="mt-3">
            {state.loading ? (<Spinner animation="border" className="loading"/>) : (
            <Container className="mb-5">
                <Image src={state.currentProduct.thumbnail_url} className="mx-auto product-info-image"/>
                <h3 className="mt-2 text-center">{state.currentProduct.title}</h3>
                <h6 className="mt-w text-center">Sold by: {state.currentProduct.seller}</h6>
                <h3 className="text-center"><span className="bg-dark text-white px-2">${state.currentProduct.price}</span></h3>
                <hr/>
                <h5>Product Description:</h5>
                <p>{state.currentProduct.description}</p>
                {checkCartList() ? (
                    <Button variant="danger" size="lg" onClick={()=>removeFromCart()}>Remove from Cart</Button>
                ) : (
                    <Button variant="success" size="lg" onClick={()=>addToCart()}>Add to Cart</Button>
                )}
            </Container>
            )}
        </div>
    );
};

export default Product;