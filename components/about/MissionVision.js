"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/AboutSection.css";
import Image from "next/image";

const AboutPageSections = () => {
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

  const section3Image = about.section3_image
    ? imageBaseUrl + about.section3_image
    : "/images/about/ab3.webp";

  const section4Image = about.section4_image
    ? imageBaseUrl + about.section4_image
    : "/images/about/ab4.webp";

  return (
    <>
      {/* --- VISION & MISSION SECTION --- */}
      <section className="custom-vm-section">
        <div className="custom-bg-layer-grey"></div>

        <div className="custom-vm-container">
          <div className="custom-vm-card">
            {/* Left side: Vision (section2_description) */}
            <div className="custom-vm-side-content">
              <div
                className="custom-vm-html"
                dangerouslySetInnerHTML={{
                  __html: about.section2_description,
                }}
              />
            </div>

            {/* Middle: Image from section3_image */}
            <div className="custom-vm-image-wrapper">
              <Image
                src={section3Image}
                alt="Vision & Mission"
                width={450}
                height={550}
                className="custom-vm-img"
              />
            </div>

            {/* Right side: Mission (section3_description) */}
            <div className="custom-vm-side-content">
              <div
                className="custom-vm-html"
                dangerouslySetInnerHTML={{
                  __html: about.section3_description,
                }}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="custom-vm-deco-dots-left"></div>
          <div className="custom-vm-deco-dots-right"></div>
          <div className="custom-vm-deco-bottom-line"></div>
          <div className="custom-vm-deco-top-right"></div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="custom-choose-section">
        <div className="custom-choose-container">
          {/* Left Side: Image from section4_image */}
          <div className="custom-choose-image-wrapper">
            <div className="custom-choose-image-card">
              <Image
                src={section4Image}
                alt="Why Choose Us"
                width={650}
                height={450}
                className="custom-choose-img"
              />
            </div>
          </div>

          {/* Right Side: Content (section4_description) */}
          <div className="custom-choose-content">
            {/* Badge + text sab API ke HTML me already hai to yeh optional hai.
                Agar sirf API content chahiye to badge/title hardcode mat karo. */}
            <div
              className="custom-choose-html"
              dangerouslySetInnerHTML={{
                __html: about.section4_description,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageSections;