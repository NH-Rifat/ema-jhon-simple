import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    //console.log(fakeData); 
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
        const product = fakeData.find( pd => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
        })
        setCart(previousCart);
    }, [])
    

    const handleAddProduct=(product)=>{
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key ===toBeAddedKey);
    let count = 1;
    let newCart;
    if(sameProduct){
        const count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct];
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product];
    }
    
    setCart(newCart);
   
   addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container" >
            <div className="product-container">
                {
                    products.map((productValue) =><Product product={productValue} handleAddProduct={handleAddProduct} showAddToCart={true} key={productValue.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
                <button className="Review-btn"><FontAwesomeIcon icon={faShoppingCart} />Review Order</button>
            </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;