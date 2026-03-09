import React from "react";
import Image from "next/image";
import aboutimg from "../../public/images/images/viva23.png";
import eclipse1 from '../../public/images/icons/eclipse1.png';
import eclipse2 from '../../public/images/icons/eclipse2.png';
import eclipse3 from '../../public/images/icons/eclipse3.png';

import "../../public/css/businessevents.css";

const BusinessEvents = () => {
  return (
    <section className="custom-events-section">
      {/* Header Section */}
      <div className="custom-events-header">
        <h1 className="custom-event-title">
          Seafront villas for rent in <br/>
          natai, <span className="custom-highlight">phang-nga</span>
        </h1>
      </div>

      {/* Main Large Image */}
      <div className="custom-events-image-container">
        <Image 
          src={aboutimg} 
          alt="Luxury Villa Interior" 
          width={1200} 
          height={600} 
          className="custom-event-main-img"
        />
      </div>

      {/* Bottom 3 Columns Section */}
      <div className="custom-events-footer-grid">
        <div className="custom-footer-card">
          <div className="custom-footer-icon">
            <span className="custom-circle-icon"><Image 
                        src={eclipse1} 
                        alt="Luxury Pool" 
                         width={50} 
                        height='auto' 
                      /></span>
          </div>
          <div className="custom-footer-text">
            <h3>Your seaside sanctuary with ap natai</h3>
            <p>
              Lorem Ipsum is simply dummy text of the unknown to printer to printing and typesetting printer printing industry.
            </p>
          </div>
        </div>

        <div className="custom-footer-card">
          <div className="custom-footer-icon">
            <span className="custom-circle-icon"><Image 
                        src={eclipse2} 
                        alt="Luxury Pool" 
                         width={50} 
                        height='auto' 
                      /></span>
          </div>
          <div className="custom-footer-text">
            <h3>A rental experience like no other</h3>
            <p>
              Lorem Ipsum is simply dummy text of the unknown to printer to printing and typesetting printer printing industry.
            </p>
          </div>
        </div>

        <div className="custom-footer-card">
          <div className="custom-footer-icon">
            <span className="custom-circle-icon"><Image 
                        src={eclipse3} 
                        alt="Luxury Pool" 
                         width={50} 
                        height='auto' 
                      /></span>
          </div>
          <div className="custom-footer-text">
            <h3>Your trusted partner in natai beachfront rentals</h3>
            <p>
              Lorem Ipsum is simply dummy text of the unknown to printer to printing and typesetting printer printing industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessEvents;