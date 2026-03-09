import React from "react";
import Image from "next/image";
import heroImg from "../../public/images/images/left-custom.png"; // Image 2 ke liye
import mainImg from "../../public/images/images/viva2.jpg"; // Image 1 ke liye
import "../../public/css/nataiproperty.css";

const NataiProperty = () => {
  return (
    <div className="custom-main-wrapper">
      
      {/* SECTION 1: Image Left, Content Right (Image 2 ka design) */}
      <section className="custom-hero-section">
        <div className="custom-hero-container">
          <div className="custom-hero-image-box">
            <Image src={heroImg} alt="Luxury Villa" className="custom-img-rounded" />
          </div>
          <div className="custom-hero-content">
            <div className="custom-tagline">
              <span className="custom-tag-box"></span> HIGH-END LIVING
            </div>
            <h2 className="custom-hero-title">
              Luxury beachfront villas in exclusive <span className="custom-cyan-text">natai beach</span>
            </h2>
            <p className="custom-hero-desc">
              AP Natai is your gateway to exceptional beachfront living and premier real estate opportunities on Natai Beach, Phang-nga — just north of Phuket, Thailand. With over 20 years of experience in the region's luxury property market.
            </p>
            <button className="custom-discover-btn">Discover more</button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default NataiProperty;