import React from "react";
import "../../public/css/forguests.css";
import aboutimg from "../../public/images/images/viva.webp";
import Link from "next/link";
import Image from "next/image";
import icon1 from '../../public/images/icons/icon1.png';
import icon2 from '../../public/images/icons/icon2.png';
import icon3 from '../../public/images/icons/icon3.png';

const ForGuests = () => {
  return (
    <section className="custom-business-section">
      <div className="custom-business-top">
        {/* Left Image Section */}
        <div className="custom-business-image">
          <Image 
            src={aboutimg} 
            alt="Luxury Pool" 
            width={700} 
            height={500} 
            className="custom-main-hero-img"
          />
        </div>

        {/* Right Text Content */}
        <div className="custom-business-content">
          <h1 className="custom-title-text">
            Sell property in 
            <span className="custom-accent"> natai, phang-nga</span>
          </h1>
          <p className="custom-description">
            Step into the realm of luxury as you explore properties for rent in
            Natai, Phang-nga. With AP Natai, every rental becomes a doorway
            to opulence and unmatched comfort.
          </p>
           <Link href="/contact">
          <button className="custom-letstalk-btn">Let's talk</button></Link>
        </div>
      </div>

      {/* Bottom 3 Cards */}
      <div className="custom-business-bottom">
        <div className="custom-bottom-card">
          <div className="custom-card-header">
            <span className="custom-icon-cyan"><Image 
            src={icon1} 
            alt="Luxury Pool" 
             width={40} 
            height='auto' 
          /></span> 
            <h3>WHY?</h3>
          </div>
          <p style={{color:'#fff',textAlign:'left'}}>
            When you’re looking to rent property in Natai, Phang-nga, AP Natai stands as the unrivalled choice. With over two decades in the region, our curated list of luxury rentals ensures you find the perfect abode.
          </p>
        </div>

        <div className="custom-bottom-card">
          <div className="custom-card-header">
            <span className="custom-icon-cyan"><Image 
            src={icon2} 
            alt="Luxury Pool" 
             width={40} 
            height='auto' 
          /></span>
            <h3>UNIQUE</h3>
          </div>
          <p style={{color:'#fff',textAlign:'left'}}>
            When you’re looking to rent property in Natai, Phang-nga, AP Natai stands as the unrivalled choice. With over two decades in the region, our curated list of luxury rentals ensures you find the perfect abode.
          </p>
        </div>

        <div className="custom-bottom-card">
          <div className="custom-card-header">
            <span className="custom-icon-cyan"><Image 
            src={icon3} 
            alt="Luxury Pool" 
             width={40} 
            height='auto' 
          /></span>
            <h3>EXPERTISE</h3>
          </div>
          <p style={{color:'#fff',textAlign:'left'}}>
            Since 2005, AP Natai has been the cornerstone of luxury rentals in Natai, Phang-nga. Our deep-rooted presence and unparalleled expertise make us the only choice for discerning individuals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForGuests;