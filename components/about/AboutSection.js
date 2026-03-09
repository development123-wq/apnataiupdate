"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/AboutSection.css";
import Image from "next/image";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  // NOTE: api yahi hai: /about-us/1/edit
  useEffect(() => {
    fetch("https://techzenondev.com/apnatai/api/about-us/1/edit")
      .then((res) => res.json())
      .then((data) => {
        // Laravel resource type response maan ke .data use kiya
        setAbout(data?.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about data:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !about) {
    return <div className="custom-loader">Loading...</div>;
  }

  // image ka full URL (agar path different ho to yahan change kar dena)
  const imageBaseUrl = "https://techzenondev.com/apnatai/storage/app/public/";
  const sectionImage = about.section1_image
    ? imageBaseUrl + about.section1_image
    : "/images/about/ab3.webp"; // fallback local image

  return (
    <section className="custom-about-section">
      {/* Decorative Cyan Bar (Left) */}
      <div className="custom-deco-left-bar"></div>

      <div className="custom-about-container">
        {/* Text Content */}
        <div className="custom-about-content">
          {/* API se aaya pura HTML (section1_description) */}
          <div
            className="custom-about-html-wrapper"
            dangerouslySetInnerHTML={{ __html: about.section1_description }}
          />

          {/* Agar list chahiye to ye rakh lo, warna hata sakte ho */}
          <ul className="custom-about-list">
            <li>
              <span className="custom-check">✓</span> Distinguished beachfront
              living for discerning buyers
            </li>
            <li>
              <span className="custom-check">✓</span> Premium villas with
              exceptional investment value
            </li>
          </ul>
        </div>

        {/* Image Side with Decorative Elements */}
        <div className="custom-about-image-wrapper">
          {/* Top Line & Dotted Pattern */}
          {/* <div className="custom-deco-top-line"></div>
          <div className="custom-deco-dots"></div> */}

          <div className="custom-image-card">
            <Image
              src={sectionImage}
              alt="About section"
              width={600}
              height={400}
              className="custom-img"
            />
          </div>

          {/* Bottom Cyan Shapes */}
          {/* <div className="custom-deco-bottom-right"></div>
          <div className="custom-deco-bottom-box"></div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;