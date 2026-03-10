"use client";
import React from 'react';
import { useRouter } from 'next/router';

import '../public/css/innerbanner.css';

const InnerBanner = ({ title, buttonText = "Get a Consultant", buttonLink = "/contact" }) => {
  const router = useRouter();

  const path = router.pathname;

  // Small Heading Map
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

  // ✅ H1 Heading Map (NEW)
  const h1HeadingMap = {
    '/for-owners': 'Where owners rest easy',
    '/about-natai-phang-nga': 'About natai phang nga',
    '/for-investors': 'Beachfront living, perfected',
    '/for-guests': 'Seamless property management'
  };

  // Banner Image Map
  const bannerMap = {
    '/about': '/images/banner/about.jpg',
    '/faqs': '/images/banner/about.jpg',
    '/agents': '/images/banner/about.jpg',
    '/agents/antoine-mouille': '/images/banner/about.jpg',
    '/agents/lou-mouille': '/images/banner/about.jpg',
    '/reviews': '/images/banner/about.jpg',
    '/about-natai-phang-nga': '/images/banner/about-natai-phang-nga.png',
    '/for-guests': '/images/banner/for-guests.png',
    '/for-owners': '/images/banner/banner-owner.png',
    '/for-investors': '/images/banner/investors.png',
    '/browse-catalog': '/images/banner/catalog.jpg',
    '/contact': '/images/banner/conatctbanner.jpg',
    '/for-rentals': '/images/banner/rent.jpg',
    '/for-real-estates': '/images/banner/sale.jpg',
    '/news': '/images/banner/news.jpg',
    '/search-for-real-estate': '/images/banner/search.jpg'
  };

  const pageTitle = headingMap[path] || 'Page';
  const bannerImage = bannerMap[path] || '/images/banner/default.jpg';

  // ✅ H1 title
  const h1Title = h1HeadingMap[path] || 'Natai Phang Nga';

  return (
    <section
      className="inner-banner"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="banner-overlay">
        <h5 className="banner-title" style={{fontSize:'15px',fontWeight:'400',marginBottom:'5px'}}>
          {title || pageTitle}
        </h5>

        {/* ✅ Dynamic H1 */}
        <h1 className="banner-title">{h1Title}</h1>

        <a
          href={buttonLink}
          className="banner-btn banner-btn-hover"
          style={{background:'none',border:'2px solid #fff',borderRadius:'100px'}}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default InnerBanner;