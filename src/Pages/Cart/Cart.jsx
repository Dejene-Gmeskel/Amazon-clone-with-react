
import React, { useContext } from 'react';
import Layout from '../../Components/Layout/Layout';
import classes from './Cart.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard'; 
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import { Type } from '../../Utility/ActionType';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Cart = () => {
  const [{ cart,user}, dispatch] = useContext(DataContext);
  const total= cart.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

  const increment =(item)=>{
    dispatch ({
      type:Type.ADD_TO_CART,
      item 
    })
  }
  const decrement =(id)=> {
    dispatch ({
      type:Type.REMOVE_FROM_CART,
      id
    })
  }
 
  
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Cart is:</h3>
          <hr />
          {
             cart?.length === 0 ? (
            <p>Oops! No item in your Cart</p>
          ) : (
            cart?.map((item,i) => {
              return <section className={classes.cart_product}>
   <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderAdd={true}
                flex={true}
              />
               <div className={classes.btn_container}>
                <button className={classes.btn} onClick={()=>increment(item)}>
                  <IoIosArrowUp size={20}/>
                </button>
                <span>{item.amount}</span>
                <button className={classes.btn} onClick={()=>decrement(item.id)}>
                  <IoIosArrowDown size={20}/>
                </button>
               </div>
               </section> 
                })
                )
          }
        </div>
        {cart?.length!==0 &&(
          <div className={classes.subtotal}>
            <div><p>({cart?.length})items</p>
            <CurrencyFormat amount={total}/>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to='./payments'>Continue to checkout</Link>
          </div>
        )} 
      </section>
    </Layout>
  );
};

export default Cart;
