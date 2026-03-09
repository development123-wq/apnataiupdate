"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/contentinvestors.css";

const API_URL =
  "https://techzenondev.com/apnatai/api/forinvestor/1/edit";

const TestimonialSection = () => {
  const [investorData, setInvestorData] = useState(null);
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
        setInvestorData(json?.data || null);
      } catch (e) {
        console.error("Error fetching forinvestor section8:", e);
        setInvestorData(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!investorData) return null;

  const { section8_title, section8_description } = investorData;

  return (
    <section className="content-investors-section">
      <div className="content-investors-content">
        {/* Heading from API */}
        <h2 className="content-investors-heading">
          {section8_title}
        </h2>

        {/* Full HTML description from API */}
        <div
          className="content-investors-paragraph"
          dangerouslySetInnerHTML={{ __html: section8_description }}
        />
      </div>
    </section>
  );
};

export default TestimonialSection;