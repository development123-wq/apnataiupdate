"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../public/css/businessevents.css";
import img1 from "../../public/images/icons/vector-1.png";
import img2 from "../../public/images/icons/vector-2.png";
import img3 from "../../public/images/icons/vector-3.png";

const API_URL = "https://techzenondev.com/apnatai/api/forowner/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

const BusinessEvents = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        const json = await res.json();
        setPage(json?.data || null);
      } catch (e) {
        console.error("Error fetching forowner section12:", e);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (!page) return null;

  const img = page.section12_image
    ? `${IMAGE_BASE}${page.section12_image}`
    : null;

  const parseEventCards = (html) => {
    if (!html) return [];
    const regex =
      /<div[^>]*class=["']event-card["'][^>]*>([\s\S]*?)<\/div>/gi;
    const blocks = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      const blockHtml = match[1];
      const h3Match = blockHtml.match(/<h3[^>]*>[\s\S]*?<\/h3>/i);
      const pMatch = blockHtml.match(/<p[^>]*>[\s\S]*?<\/p>/i);

      blocks.push({
        titleHtml: h3Match ? h3Match[0] : "",
        descHtml: pMatch ? pMatch[0] : "",
      });

      if (blocks.length === 3) break;
    }

    return blocks;
  };

  const cards = parseEventCards(page.section12_description);

  const icons = [img1, img2, img3];
  const iconBgClasses = ["blue-bg", "dark-bg", "cyan-bg"];

  // Main title highlight: 1 word normal + next 2 words cyan
  const highlightMainTitle = (title) => {
    if (!title) return "";
    const words = title.trim().split(/\s+/);
    if (words.length <= 1) return title;

    const first = words[0];
    const nextTwo = words.slice(1, 3).join(" ");
    const rest = words.slice(3).join(" ");

    return `${first} ${
      nextTwo
        ? `<span style="color:#00e2ee;">${nextTwo}</span>`
        : ""
    }${rest ? ` ${rest}` : ""}`;
  };

  const rawMainTitle =
    page.section12_title ||
    "Your trusted partner in premium property management";

  const mainTitleHtml = highlightMainTitle(rawMainTitle);

  return (
    <section className="property-section">
      <div className="container">
        {/* Header Section */}
        <div className="property-header">
          <span className="sub-title sub-title-logistics">
            LOGISTICS SOLUTIONS
          </span>
          <h2
            className="main-title"
            dangerouslySetInnerHTML={{ __html: mainTitleHtml }}
          />
        </div>

        <div className="property-content property-content-new property-newsec">
          {/* Left Side: Image */}
          <div className="property-image-wrapper">
            {img && (
              <Image
                src={img}
                alt="Property"
                width={800}
                height={500}
                className="featured-image"
              />
            )}
          </div>

          {/* Right Side: Timeline/List */}
          <div className="property-features">
            {cards.map((card, index) => (
              <div key={index} className="feature-item">
                <div className={`icon-box ${iconBgClasses[index] || ""}`}>
                  <i className="user-icon">
                    <Image
                      src={icons[index] || img1}
                      alt="Property"
                      width={30}
                      height={30}
                      className="rounded-img"
                    />
                  </i>
                </div>
                <div className="feature-text">
                  <div
                    className="feature-title-html"
                    dangerouslySetInnerHTML={{ __html: card.titleHtml }}
                  />
                  <div
                    className="feature-desc-html"
                    dangerouslySetInnerHTML={{ __html: card.descHtml }}
                  />
                </div>
              </div>
            ))}

            {cards.length === 0 && (
              <p style={{ color: "#fff" }}>
                section12_description ka HTML format check karein (event-card
                divs).
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessEvents;