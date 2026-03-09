import React, { useEffect, useState } from 'react';
import "../../public/css/VillaComponent.css";

const VillaComponent = () => {
  const [section12, setSection12] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    image: null
  });

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await fetch('https://techzenondev.com/apnatai/api/forinvestor/1/edit');
        const result = await response.json();

        console.log('API Response:', result);

        const data = result?.data || result;

        const imageUrl = data?.section12_image
          ? `https://techzenondev.com/apnatai/storage/app/public/${data.section12_image}`
          : 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80';

        console.log('Image Path from API:', data?.section12_image);
        console.log('Final Image URL:', imageUrl);

        setSection12({
          title: data?.section12_title || '',
          description: data?.section12_description || '',
          buttonText: data?.section12_button_text || '',
          buttonLink: data?.section12_button_link || '#',
          image: imageUrl
        });
      } catch (error) {
        console.error('Error fetching investor data:', error);
      }
    };

    fetchInvestorData();
  }, []);

  return (
    <div className="hero-container">
      <div className="image-section">
        <img
          src={section12.image || undefined}
          alt={section12.title || "Premium Villa"}
        />
      </div>

      <div className="content-section">
        <h1 className="main-title">
          {section12.title || "Premium villas with unmatched oceanfront views"}
        </h1>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: section12.description || ''
          }}
        />

        {section12.buttonText && (
          <a
            href={section12.buttonLink}
            className="read-more-btn"
          >
            {section12.buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default VillaComponent;