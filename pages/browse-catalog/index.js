'use client';
import "../../app/globals.css";


import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import BrowseCatalog from '../../components/BrowseCatalog/BrowseCatalog';
import Banner from '../../components/BrowseCatalog/CatalogBanner';


const BrowseCataloge = () => {
  return (
    <>
    <Header/>
  <Banner/>
    <BrowseCatalog/>
    <Footer/>
    </>
  );
};

export default BrowseCataloge;
