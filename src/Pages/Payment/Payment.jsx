import React, { useContext,useState} from 'react';
import Layout from '../../Components/Layout/Layout';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from"../../Components/Product/ProductCard"
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

const Payment = () => {
  const [{ cart,user }] = useContext(DataContext); 
  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total= cart.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError]=useState(null)
  const handleChange=(e)=>{
  console.log(e)
  e?.error?.message ? setCardError(e.error.message): setCardError("")
  }
  const handlePayment =(e)=>{
    e.preventDefault()
  }


  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout {totalItem} items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
        {user && (
          <div>
         <h3>Delivery Address</h3>
          <div>
         <div>{user?.email}</div>
        <div>Dj React Dev Lane</div>
         <div>Addis Ababa, ET</div>
    </div>
  </div>
)}

        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              cart?.map((item)=><ProductCard product={item} flex={true} renderAdd={true}/>)
            }
          </div>
        </div>
        <hr />
        {/* card */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* card error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* payment card */}
               <CardElement onChange={handleChange}/>
               {/* price total */}
               <div className={classes.payment_price}>
                <div>
                  <span style={{display:"flex",gap:"10px"}}>
                    <p >Total order |</p><CurrencyFormat amount={total}/>   
                  </span>
                </div>
                <button type='submit'>Pay Now</button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
