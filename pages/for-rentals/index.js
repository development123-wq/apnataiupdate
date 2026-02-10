'use client';
import "../../app/globals.css";


import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import ForRentals from '../../components/ForRentals/ForRentals';
import Banner from '../../components/BrowseCatalog/RentCatalogBanner';



const ForRental = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <ForRentals/>
    <Footer/>
    </>
  );
};

export default ForRental;
