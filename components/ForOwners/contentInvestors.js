"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/contentinvestors.css";

const TestimonialSection = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await fetch(
          "https://techzenondev.com/apnatai/api/forowner/1/edit"
        );
        const result = await res.json();
        setOwnerData(result.data || null);
      } catch (err) {
        console.error("Error fetching forowner section 9:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!ownerData) return <div>No data</div>;

  const { section9_title, section9_description } = ownerData;

  return (
    <section className="content-investors-section">
      <div className="content-investors-content">
        {/* Heading from API */}
        <h2 className="content-investors-heading">
          {section9_title}
        </h2>

        {/* Full HTML description from API */}
        <div
          className="content-investors-paragraph"
          dangerouslySetInnerHTML={{ __html: section9_description }}
        />
      </div>
    </section>
  );
};

export default TestimonialSection;