'use client';
import "../../app/globals.css";
import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import aboutimg from '../../public/images/images/viva.webp';
import '../../public/css/forguests.css';
import ForRentals from '../../components/ForInvesters/ForGuests';
import ContentInvestors from '../../components/ForInvesters/contentInvestors';
import VillaSection from '../../components/ForInvesters/VillaSection';
import InvestmentSection from '../../components/ForInvesters/InvestmentSection';
import InvestmentSectionLast from '../../components/ForInvesters/InvestmentSectionLast';

import Card from "../../components/PropertyCardInvestors";

const ForRental = () => {
  return (
    <>
      <Header/>
      <InnerBanner/>
   <ForRentals/>
   <ContentInvestors/>
   <VillaSection/>
   <InvestmentSection/>

   <Card/>
   <InvestmentSectionLast/>
      <Footer/>
    </>
  );
};

export default ForRental;
