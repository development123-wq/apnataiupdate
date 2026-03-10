import React, { useEffect, useState } from 'react';
import "../../public/css/InvestmentSection.css";

const InvestmentFinal = () => {
  const [section13, setSection13] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: ''
  });

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await fetch('https://techzenondev.com/apnatai/api/forinvestor/1/edit');
        const result = await response.json();

        console.log('API Response:', result);

        const data = result?.data || result;

        const imageUrl = data?.section13_image
          ? `https://techzenondev.com/apnatai/storage/app/public/${data.section13_image}`
          : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

        setSection13({
          title: data?.section13_title || '',
          description: data?.section13_description || '',
          buttonText: data?.section13_button_text || '',
          buttonLink: data?.section13_button_link || '#',
          image: imageUrl
        });
      } catch (error) {
        console.error('Error fetching investor data:', error);
      }
    };

    fetchInvestorData();
  }, []);

  return (
    <div className="final-container">
      <div className="final-content final-content-bg">
        <div className="text-wrapper">
          <h2 className="final-title">
            {section13.title || 'Where coastal beauty meets investment excellence'}
          </h2>

          <div
            className="final-description"
            dangerouslySetInnerHTML={{
              __html: section13.description || ''
            }}
          />

          {section13.buttonText && (
            <a
              href={section13.buttonLink}
              className="final-btn"
            >
              {section13.buttonText}
            </a>
          )}
        </div>
      </div>

      <div className="final-image-container">
        <img
          src={section13.image}
          alt={section13.title || 'Coastal Villa Landscape'}
          className="final-img"
        />
      </div>
    </div>
  );
};

export default InvestmentFinal;
