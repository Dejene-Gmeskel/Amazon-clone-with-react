import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/ActionType';

const ProductCard = ({ product, flex, renderDesc,renderAdd }) => {
  const { image, title, id, rating, price, description } = product || {}; 
  //console.log(product)
  const [state, dispatch] = useContext(DataContext);

const addToCart = () => {
  dispatch({
    type: Type.ADD_TO_CART,
    item: {
      image,
      title,
      id,
      rating,
      price,
      description
    }
  });
};


  return (
    <section className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} /> {/* Set alt attribute to title */}
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "650px", paddingTop: '8px' }}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {!renderAdd && <button className={classes.button} onClick={addToCart}>
          add to cart
        </button>
        }
        
      </div>
    </section>
  );
};

export default ProductCard;
