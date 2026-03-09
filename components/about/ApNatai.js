"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/AboutSection.css";
import aboutimg from "../../public/images/about/ab5.webp";
import Image from "next/image";

const ApNatai = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageBaseUrl = "https://techzenondev.com/apnatai/storage/app/public/";

  useEffect(() => {
    fetch("https://techzenondev.com/apnatai/api/about-us/1/edit")
      .then((res) => res.json())
      .then((data) => {
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

  const section6Image = about.section6_image
    ? imageBaseUrl + about.section6_image
    : aboutimg; // tumhara original image fallback

  return (
    <section className="custom-aprole-section">
      {/* Background Layer #f4f4f4 */}
      <div className="custom-aprole-bg"></div>

      <div className="custom-aprole-container">
        {/* Right Side: Content – same structure, data API se */}
        <div className="custom-aprole-content-side">
          <div className="custom-aprole-badge">
            <span className="custom-aprole-square"></span>
            <span className="custom-aprole-badge-text">
              Curated Luxury Homes
            </span>
          </div>

          {/* yahan pe poora h2 + <p> API ke HTML se aa raha hai */}
          <div
            className="custom-aprole-desc-wrapper"
            dangerouslySetInnerHTML={{
              __html: about.section6_description,
            }}
          />
        </div>

        {/* Left Side: Image with Large Rounded Corners – same design */}
        <div className="custom-aprole-image-side">
          <div className="custom-aprole-card">
            <Image
              src={section6Image}
              alt="Natai Development"
              width={650}
              height={450}
              className="custom-aprole-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApNatai;