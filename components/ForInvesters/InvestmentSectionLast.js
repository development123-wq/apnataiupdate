"use client";

import React, { useEffect, useState } from 'react';
import '../../public/css/AboutSection.css';
import Image from 'next/image';

const ApNatai = () => {
  const [section14, setSection14] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '#',
    image: ''
  });

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await fetch('https://techzenondev.com/apnatai/api/forinvestor/1/edit');
        const result = await response.json();

        console.log('API Response:', result);

        const data = result?.data || result;

        const imageUrl = data?.section14_image
          ? `https://techzenondev.com/apnatai/storage/app/public/${data.section14_image}`
          : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

        setSection14({
          title: data?.section14_title || '',
          description: data?.section14_description || '',
          buttonText: data?.section14_button_text || '',
          buttonLink: data?.section14_button_link || '#',
          image: imageUrl
        });
      } catch (error) {
        console.error('Error fetching investor data:', error);
      }
    };

    fetchInvestorData();
  }, []);

  return (
    <section className="custom-aprole-section">
      <div className="custom-aprole-bg"></div>

      <div className="custom-aprole-container">
        <div className="custom-aprole-image-side">
          <div className="custom-aprole-card">
            <Image
              src={section14.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'}
              alt={section14.title || 'Natai Development'}
              width={650}
              height={450}
              className="custom-aprole-img"
              unoptimized
            />
          </div>
        </div>

        <div className="custom-aprole-content-side">
          <div className="custom-aprole-badge">
            <span className="custom-aprole-square"></span>
            <span className="custom-aprole-badge-text">Oceanfront Living</span>
          </div>

          <h2 className="custom-aprole-title">
            {section14.title || 'Curated luxury homes in prime locations'}
          </h2>

          <div
            className="custom-aprole-desc"
            dangerouslySetInnerHTML={{
              __html: section14.description || ''
            }}
          />

          {section14.buttonText && (
            <a href={section14.buttonLink} className="investors-ddmore">
              {section14.buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApNatai;