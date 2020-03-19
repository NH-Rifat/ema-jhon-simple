import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './ReviewItems.css'

const ReviewItems = (props) => {
    
    const {name, quantity, key, price}= props.product;
    return (
        <div className="review-items">
            <h4 className="product-name">{name}</h4>
            <p className="product-quantity">Quantity: {quantity}</p>
    <p><small>${price}</small></p>
            <button className="review-btn" 
            onClick={() => props.removeProduct(key)}><FontAwesomeIcon icon={faShoppingCart} />Remove</button>
        </div>
    );
};

export default ReviewItems;