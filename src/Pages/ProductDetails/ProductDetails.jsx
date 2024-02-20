import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { producturl } from '../../Api/baseUrl';
import Layout from '../../Components/Layout/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${producturl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
         
      });
  }, []); // Add productId to the dependency array

  return (
    <Layout>
      {isLoading ? <Loader /> :product && <ProductCard product={product} flex={true} renderDesc = {true}/>}
      
    </Layout>
  );
};

export default ProductDetails;
