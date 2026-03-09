"use client";
import React from 'react';
import { useRouter } from 'next/router';  

import '../public/css/innerbanner.css';

const InnerBanner = ({ title, buttonText = "Get a Consultant", buttonLink = "/contact" }) => {
  const router = useRouter();

  // ✅ Get current path
  const path = router.pathname;

  // ✅ Map URL path to heading text
  const headingMap = {
    '/about': 'About Us',
    '/faqs':'FAQs',
    '/agents':'Our Agents',
    '/agents/antoine-mouille': 'Antoine Mouille',
    '/agents/lou-mouille': 'Lou Mouille',
    '/reviews': 'Happy Clients',
    '/about-natai-phang-nga': 'About Natai Phang Nga',
    '/for-guests': 'For Guests',
    '/for-owners': 'For Owners',
    '/for-investors': 'For Investors',
    '/browse-catalog': 'Browse Catalog',
    '/contact': 'Contact Us',
    '/for-rentals': 'For Rent',
    '/for-real-estates': 'For Sale',
    '/news': 'News & Events',
    '/search-for-real-estate': 'Search For Realestate'


  };

  const pageTitle = headingMap[path] || 'Page';

  return (
    <section className="inner-banner">
      <div className="banner-overlay">
        <h5 className="banner-title" style={{fontSize:'15px',fontWeight:'400'}}>{title || pageTitle}</h5>
        <h1 className="banner-title">Natai Phang Nga</h1>
        <a href={buttonLink} className="banner-btn" style={{background:'none',border:'2px solid #fff',borderRadius:'100px'}}>
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default InnerBanner;
