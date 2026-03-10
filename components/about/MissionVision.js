"use client";
import React, { useEffect, useState, useRef } from "react";
import "../../public/css/AboutSection.css";
import Image from "next/image";

const AboutPageSections = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const chooseHtmlRef = useRef(null);

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

  // Function to highlight 3rd & 4th words (after first 2 words)
  const highlightThirdAndFourthWords = () => {
    const h2Elements = chooseHtmlRef.current?.querySelectorAll('h2');
    h2Elements?.forEach((h2) => {
      const text = h2.textContent || h2.innerText || '';
      const words = text.trim().split(/\s+/);
      
      if (words.length >= 4) {
        // Remove existing spans first
        const existingSpans = h2.querySelectorAll('span.highlight-words');
        existingSpans.forEach(span => span.replaceWith(...Array.from(span.childNodes)));
        
        // First 2 words (normal), next 2 words (highlighted), rest normal
        const firstTwoWords = words.slice(0, 2).join(' ');
        const highlightTwoWords = words.slice(2, 4).join(' ');
        const remainingWords = words.slice(4).join(' ');
        
        let newHTML = firstTwoWords;
        newHTML += ` <span class="highlight-words" style="color: #00e2ee;">${highlightTwoWords}</span>`;
        if (remainingWords) {
          newHTML += ` ${remainingWords}`;
        }
        
        h2.innerHTML = newHTML;
      }
    });
  };

  // Apply highlighting after content loads and DOM updates
  useEffect(() => {
    if (!loading && about && chooseHtmlRef.current) {
      // Small delay to ensure dangerouslySetInnerHTML has rendered
      const timer = setTimeout(() => {
        highlightThirdAndFourthWords();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, about]);

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
            <div className="custom-vm-side-content">
              <div
                className="custom-vm-html"
                dangerouslySetInnerHTML={{
                  __html: about.section2_description,
                }}
              />
            </div>

            <div className="custom-vm-image-wrapper">
              <Image
                src={section3Image}
                alt="Vision & Mission"
                width={450}
                height={550}
                className="custom-vm-img"
              />
            </div>

            <div className="custom-vm-side-content">
              <div
                className="custom-vm-html"
                dangerouslySetInnerHTML={{
                  __html: about.section3_description,
                }}
              />
            </div>
          </div>

          <div className="custom-vm-deco-dots-left"></div>
          <div className="custom-vm-deco-dots-right"></div>
          <div className="custom-vm-deco-bottom-line"></div>
          <div className="custom-vm-deco-top-right"></div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="custom-choose-section">
        <div className="custom-choose-container">
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

          <div className="custom-choose-content">
            <span style={{display:'flex',gap:'5px',marginBottom:'10px'}}>
              <span style={{marginTop:'4px',background:'#00E2EE',width:'10px',height:'10px',display: 'block'}}></span>
              Trusted Expertise
            </span>
            <div
              ref={chooseHtmlRef}
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