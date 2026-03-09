'use client';
import "../../app/globals.css";
import "../../app/aboutnew.css";
import Aboutus from '../../components/about/AboutSection';
import ApNatai from '../../components/about/ApNatai';
import MissionVision from '../../components/about/MissionVision';
import aboutimg from '../../public/images/about/ab1.webp'; 
import aboutimg2 from '../../public/images/about/ab2.webp'; 

import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';
import AboutCommitment from '../../components/about/AboutCommitment';

const About = () => {
  return (
    <>
      <Header />
      <InnerBanner />
      <Aboutus />

      <MissionVision/>

      <AboutCommitment />
      <ApNatai />
      <Footer />
    </>
  );
};

export default About;