'use client';
import "../../app/globals.css";


import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import ForRentals from '../../components/ForOwners/ForGuests';
import BusinessEvents from '../../components/OwnersBusinessEvents/BusinessEvents';
import Card from "../../components/PropertyCardInvestors";
import ContentInvestors from '../../components/ForOwners/contentInvestors';



const ForRental = () => {
  return (
    <>
    <Header/>
    <InnerBanner/>
    <ForRentals/>
    <ContentInvestors/>
    <BusinessEvents/>
    <Card/>






    <Footer/>
    </>
  );
};

export default ForRental;
