import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css'
import Cart from '../cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import happyImage from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart]= useState([]);
    const [orderPlace, setOrderPlace]= useState(false);
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;  
       
    });

    setCart(cartProducts);

},[]);

   let thankYou;
   if(orderPlace){
       thankYou = <img src={happyImage} alt=""/>
   }
    return (
        <div className="twin-container">

           <div className="product-container">
           {
                cart.map((pd) => <ReviewItems
                key = {pd.key}
                removeProduct = {removeProduct}
                product={pd}></ReviewItems>)
            }

            { thankYou }
            
           </div>
           <div className="cart-container">
        <Cart cart={cart}>
            <button className="Review-btn" onClick={handlePlaceOrder}><FontAwesomeIcon icon={faShoppingCart} />place Order</button>
        </Cart>
           </div>
        </div>
    );
};

export default Review;
