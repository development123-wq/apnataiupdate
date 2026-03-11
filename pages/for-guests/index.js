'use client';
import "../../app/globals.css";


import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import ForRentals from '../../components/ForGuests/ForGuests';
import BusinessEvents from '../../components/BusinessEvents/BusinessEvents';
import NataiProperty from '../../components/BusinessEvents/NataiProperty';
import Card from "../../components/PropertyCardInvestors";


const ForRental = () => {
  return (
    <>
    <Header/>
    <InnerBanner/>
    <ForRentals/>
   
    <BusinessEvents/>
    <NataiProperty/>
    <Card/>






    <Footer/>
    </>
  );
};

export default ForRental;
