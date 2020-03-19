import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
  console.log(props);
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="products">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-des">
                <h4><Link to={"/product/"+key}> {name}</Link></h4>

                    <div className="product-seller">
                        <p>by:{seller}</p>
                    </div> 

                    <div className="product-price">
                        <p>${price}</p>
                    </div> 

                    <div className="product-stock">
                        <p>Only {stock} left in stock - Order soon</p>
                    </div>  

                    <div className="product-button">
                        { props.showAddToCart === true&& <button onClick={()=>props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
                    </div> 
            </div>
        </div>
    );
};

export default Product;