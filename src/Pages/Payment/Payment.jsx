import React, { useContext } from 'react';
import Layout from '../../Components/Layout/Layout';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from"../../Components/Product/ProductCard"

const Payment = () => {
  const [{ cart,user }] = useContext(DataContext);
   

  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

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
         <div>{user.email}</div>
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
              cart?.map((item)=><ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>
        <hr />
        {/* card */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div></div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
