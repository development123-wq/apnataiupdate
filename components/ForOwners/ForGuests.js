"use client";

import React, { useEffect, useState } from "react";
import "../../public/css/forguests.css";
import "../../public/css/forguestsnew.css";
import Image from "next/image";

// ✅ Apni images ka sahi path yahan import kar lein
import img1 from "../../public/images/icons/icon1.png"; 
import img2 from "../../public/images/icons/icon2.png";
import img3 from "../../public/images/icons/icon3.png";

const API_URL = "https://techzenondev.com/apnatai/api/forowner/1/edit";
const IMAGE_BASE = "https://techzenondev.com/apnatai/storage/app/public/";

const Html = ({ className, html }) => {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function ForGuests() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setPage(json?.data || null);
      } catch (e) {
        console.log("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!page) return <p>No data</p>;

  const tabs = [
    { id: 1, label: "Buying" },
    { id: 2, label: "Building" },
    { id: 3, label: "Developing" },
    { id: 4, label: "Managing" },
    { id: 5, label: "Marketing" },
    { id: 6, label: "Sourcing" },
    { id: 7, label: "Renovating" },
  ];

  const n = activeTab;

  return (
    <main className="investor-page">
      <div className="main-header-section">
        <h2 className="main-title-top">Effortless property care</h2>
      </div>

      <section className="tabs-nav-container">
        <div className="tabs-wrapper">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="tab-content-display">
        <div className="content-flex-container">
          <div className="tab-image-side">
            {page[`section${n}_image`] && (
              <Image
                src={`${IMAGE_BASE}${page[`section${n}_image`]}`}
                alt="Property"
                width={700}
                height={450}
                className="rounded-img"
              />
            )}
          </div>
          <div className="tab-text-side">
            <div className="badge-container">
              <span className="cyan-sq"></span>
              <span className="badge-text">{tabs.find(t => t.id === n).label.toUpperCase()}</span>
            </div>
            <h1 className="tab-main-heading">
              {page[`section${n}_title`]?.split(',').map((part, i) => (
                <span key={i} className={i === 1 ? "cyan-text" : ""}>
                   {i === 0 ? part : `, ${part}`}
                </span>
              ))}
            </h1>
            <Html className="tab-desc" html={page[`section${n}_description`]} />
            <button className="lets-talk-btn">Let's talk</button>
          </div>
        </div>
      </section>

      {/* 4. DARK BOTTOM CARDS WITH IMAGES */}
      <section className="dark-cards-section">
        <div className="dark-cards-container">
          {[
            { t: page[`section${n}_lefttab_title`], d: page[`section${n}_lefttab_description`], img: img1 },
            { t: page[`section${n}_middletab_title`], d: page[`section${n}_middletab_description`], img: img2 },
            { t: page[`section${n}_righttab_title`], d: page[`section${n}_righttab_description`], img: img3 }
          ].map((card, idx) => (
            card.t && (
              <div className="dark-card" key={idx}>
                <div className="card-header">
                  <div className="card-image-icon">
                    <Image src={card.img} alt="icon" width={40} height={40} />
                  </div>
                  <h3 className="card-title">{card.t}</h3>
                </div>
                <Html className="card-body" html={card.d} />
              </div>
            )
          ))}
        </div>
      </section>

      
    </main>
  );
}