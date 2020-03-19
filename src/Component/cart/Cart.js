import React from 'react';
import './Cart.css'


const Cart = (props) => {
    const cart = props.cart;
    let totalPrice = 0;
    for(let i=0;i<cart.length;i++){
        const product = cart[i];
        totalPrice = totalPrice+product.price * product.quantity;  
    }
    let shipping = 0;

    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99
    }
    else if(totalPrice > 0){
        shipping = 12.99
    }
    const Tax = (totalPrice / 10).toFixed(2);
    const grandTotal = (totalPrice+shipping+ Number(Tax)).toFixed(2);
    const formateNumber=(num)=>{
        const precesion = num.toFixed(2);
        return Number(precesion);
    }
    return (
        <div className="cart">
            <h4>Order summary</h4>
            <p>Items ordere: {cart.length}</p>
            <p><small> Product Price: {formateNumber(totalPrice)}</small></p>
            <p><small> Shipping cost: {shipping}</small></p>
            <p><small>Tax + VAT: {Tax}</small> </p>
            <p>Total Price: {grandTotal}</p>
            <br/>

            {
                props.children 
            }
           
        </div>
    );
};

export default Cart;