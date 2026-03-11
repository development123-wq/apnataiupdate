"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "../public/css/PropertyCardGuest.css";

const API_URL = "https://techzenondev.com/apnatai/api/forowner/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

const AfterTwoWordsAccent = ({ text, accentColor = "#00e2ee" }) => {
  if (!text) return null;

  const words = String(text).trim().split(/\s+/); // [web:123]
  const first = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  if (!rest) return <>{first}</>;

  return (
    <>
      {first} <span style={{ color: accentColor }}>{rest}</span>
    </>
  );
};

const stripHtml = (html) => {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
};

const PropertyCard = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});

  const handleToggle = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const res = await fetch(API_URL, {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setPage(null);
          return;
        }

        const json = await res.json();
        setPage(json?.data || null);
      } catch (e) {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const cards = useMemo(() => {
    if (!page) return [];

    return [
      {
        id: 1,
        image: page.section14_left_image,
        title: page.section14_left_title,
        description: stripHtml(page.section14_left_description),
        listItems: Array.isArray(page.section14_left_tags) ? page.section14_left_tags : [],
      },
      {
        id: 2,
        image: page.section14_middle_image,
        title: page.section14_middle_title,
        description: stripHtml(page.section14_middle_description),
        listItems: Array.isArray(page.section14_middle_tags) ? page.section14_middle_tags : [],
      },
      {
        id: 3,
        image: page.section14_right_image,
        title: page.section14_right_title,
        description: stripHtml(page.section14_right_description),
        listItems: Array.isArray(page.section14_right_tags) ? page.section14_right_tags : [],
      },
    ].filter((c) => c.title || c.description || c.image);
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (!page) return <p>No data</p>;

  const heroImg = page.section13_image ? `${IMAGE_BASE}${page.section13_image}` : null;
  const heading = page.section13_title || "";

  return (
    <>
      <div className="image-guest">
        {heroImg ? (
          <Image src={heroImg} alt="Section 13" fill className="property-image" />
        ) : (
          <p></p>
        )}
      </div>

      <div className="property-container custom-sec-two">
        <div className="fancy-mainheading fancy-mainheading-two fancy-mainheading-twotwo" style={{ background: "none",paddingTop:'0px',paddingBottom:'30px' }}>
          <h2 className="typing-texts" style={{width:'100%'}}>
            <AfterTwoWordsAccent text={heading} accentColor="#00e2ee" />
          </h2><br></br>
            <p style={{color:'#fff',textAlign:'center',width:'1000px',margin:'auto'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but the leap into electronic unchanged.</p>
            <a href="#" className="banner-btn" style={{background:'none',marginTop:'20px',border:'2px solid #fff',borderRadius:'100px'}}>
          Contact Us Today
        </a>

        </div>

        {cards.map((property) => {
          const imgSrc = property.image ? `${IMAGE_BASE}${property.image}` : null;
          const first3 = property.listItems.slice(0, 3);
          const rest = property.listItems.slice(3);

          return (
            <div className="property-card" key={property.id}>
              <div className="image-wrapper">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={property.title || "Property"}
                    fill
                    className="property-image"
                  />
                ) : null}
              </div>

              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-description">{property.description}</p>

                <ul className="property-list">
                  {first3.map((item, index) => (
                    <li key={index} className="list-item">
                      {item}
                    </li>
                  ))}
                </ul>

                {property.listItems.length > 3 && (
                  <>
                    {showMore[property.id] && (
                      <ul className="property-list">
                        {rest.map((item, index) => (
                          <li key={index} className="list-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      className={`read-more-btn ${showMore[property.id] ? "collapsed" : ""}`}
                      onClick={() => handleToggle(property.id)}
                    >
                      {showMore[property.id] ? "Show Less" : "Learn More"}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PropertyCard;