'use client';
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import '../public/css/PropertySlider.css'; 

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Beds from "../public/images/logo-amenities/bedrooms.png";
import Bath from "../public/images/logo-amenities/bathrooms.png";
import Area from "../public/images/logo-amenities/areafeet.png";

export default function PropertySlider() {
  const sliderRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = 'https://techzenondev.com/apnatai/storage/app/public/';

  // ✅ 20 words truncate + HTML strip function
  const truncateDescription = (htmlString, maxWords = 20) => {
    // Remove HTML tags
    const text = htmlString?.replace(/<[^>]*>/g, '') || '';
    // Split into words and truncate
    const words = text.split(/\s+/);
    return words.slice(0, maxWords).join(' ') + (words.length > maxWords ? '...' : '');
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://techzenondev.com/apnatai/api/property-for-rent-home');
        const result = await response.json();
        
        if (result && result.status && result.data && result.data.data) {
          setProperties(result.data.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const settings = {
    dots: false,
    infinite: properties.length > 3,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (loading) return null;

  return (
    <section className="property-section property-section-home property-bg-two">
      <div className="property-bg">
        <Image src="/images/beach-bg1.jpg" alt="Background" fill priority />
      </div>

      <div className="property-content">
        <div className="heading-row">
          <div>
            <h2 className="slider-heading"> 
              Properties For <span>Rent</span>
            </h2>
            <p className="slider-heading">
              Explore the latest rental properties with comfort, style, and convenience.
            </p>
          </div>

          <div className="arrows-container arrow-container-nextprev">
            <div
              className="arrow prev"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <span>←</span>
            </div>
            <div
              className="arrow next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="slider-wrapper">
          {properties.length > 0 && (
            <Slider ref={sliderRef} {...settings} className="property-slider">
              {properties.map((item) => (
                <div className="property-card" key={item.id}>
                  <div className="image-wrapper">
                    <Image
                      src={`${IMAGE_BASE_URL}${item.main_image}`}
                      alt={item.title}
                      width={600}
                      height={400}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  
                  <div className="property-info">
                    {/* ✅ TITLE LINK SAME */}
                    <Link href={`/property/${item.slug}`} className="property-title-link">
                      <h3 className="property-title">{item.title}</h3>
                    </Link>
                    
                    {/* ✅ DESCRIPTION = 20 WORDS MAX + HTML STRIP */}
                    <p className="property-description" style={{color:'#666', fontSize:'14px', margin:'5px 0 10px 0'}}>
                     {truncateDescription(item.description)}
                    </p>

                    <div className="property-details">
                      <div class="detail-item">
                        <Image src={Beds} alt="Bedrooms" width={20} height={20} /> 
                        {item.min_beds} Bedrooms
                      </div>
                      <div class="detail-item">
                        <Image src={Bath} alt="Bathrooms" width={20} height={20} /> 
                        {item.min_baths} Bathrooms
                      </div>
                      <div class="detail-item">
                        <Image src={Area} alt="Area" width={20} height={20} /> 
                        {item.min_area_sqft?.toLocaleString()} sqft
                      </div>
                    </div>
                  </div>
                  
                  <div className="property-footer">
                    
                    <div className="price"><h5 className="forsale-heading">for Rent</h5> ฿{parseFloat(item.min_price)?.toLocaleString()}</div>
                    <a className="read-more" href={`/property/${item.slug}`}>Read More »</a>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
