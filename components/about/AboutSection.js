"use client";
import React, { useEffect, useState, useRef } from "react";
import "../../public/css/AboutSection.css";
import Image from "next/image";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const aboutHtmlRef = useRef(null);

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

  // Function to highlight LAST 2 words of h2 tags in custom-about-content
  const highlightLastTwoWords = () => {
    const h2Elements = aboutHtmlRef.current?.querySelectorAll('h2');
    h2Elements?.forEach((h2) => {
      const text = h2.textContent || h2.innerText || '';
      const words = text.trim().split(/\s+/);
      
      if (words.length >= 2) {
        // Remove existing spans first
        const existingSpans = h2.querySelectorAll('span.last-two-words');
        existingSpans.forEach(span => span.replaceWith(...Array.from(span.childNodes)));
        
        // Last 2 words highlight, first part normal
        const lastTwoWords = words.slice(-2).join(' ');
        const firstPart = words.slice(0, -2).join(' ');
        
        h2.innerHTML = firstPart 
          ? `${firstPart} <span class="last-two-words" style="color: #00E2EE;">${lastTwoWords}</span>`
          : `<span class="last-two-words" style="color: #00E2EE;">${lastTwoWords}</span>`;
      }
    });
  };

  // Apply highlighting after content loads
  useEffect(() => {
    if (!loading && about && aboutHtmlRef.current) {
      const timer = setTimeout(() => {
        highlightLastTwoWords();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, about]);

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
            ref={aboutHtmlRef}
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
          <div className="custom-image-card">
            <Image
              src={sectionImage}
              alt="About section"
              width={600}
              height={400}
              className="custom-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;