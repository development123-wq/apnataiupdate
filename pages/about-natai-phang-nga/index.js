'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import Aboutus from '../../components/about-natai-phang-nga/AboutSection';
import NataiHero from '../../components/about-natai-phang-nga/NataiHero';
import ManagementSection from '../../components/about-natai-phang-nga/ManagementSection';
import DiscoverSection from '../../components/about-natai-phang-nga/DiscoverSection';
import Vision from '../../components/about-natai-phang-nga/Vision';
import Mission from '../../components/about-natai-phang-nga/Mission';
import WhyUs from '../../components/about-natai-phang-nga/WhyUs';


import Image from 'next/image';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InnerBanner from '../../components/InnerBanner';


const About = () => {
  return (
    <>
    <Header/>
    <InnerBanner/>
    <Aboutus/>
    <NataiHero/>
    <ManagementSection/>
    <DiscoverSection/>
    
    {/* <WhyUs/> */}
    <Footer/>



    </>
  );
};

export default About;
