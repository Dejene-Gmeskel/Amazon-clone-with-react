import React from 'react'
import CarouselEffect from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'
import Layout from '../../Components/Layout/Layout'
import classes from './Landing.module.css'

const Landing = () => {
  return (
    <Layout>
      <CarouselEffect/>
      <Category/>
      <Product/>
    </Layout>
  )
}

export default Landing