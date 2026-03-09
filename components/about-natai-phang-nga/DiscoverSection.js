"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../public/css/DiscoverSection.css";

const IMAGE_BASE_URL = "https://techzenondev.com/apnatai/storage/app/public/";

const DiscoverSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(
          "https://techzenondev.com/apnatai/api/about-apnatai/1"
        );
        const result = await res.json();
        setAboutData(result.data || null);
      } catch (err) {
        console.error("Error fetching about-apnatai:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!aboutData) return <div>No data</div>;

  const section4Image = aboutData.section4_image
    ? IMAGE_BASE_URL + aboutData.section4_image
    : "/images/icons/img1.png";

  const section5Image = aboutData.section5_image
    ? IMAGE_BASE_URL + aboutData.section5_image
    : "/images/icons/img2.png";

  return (
    <div className="custom-discover-wrapper">
      {/* SECTION 1: section4_image LEFT + section4_description RIGHT */}
      <section className="custom-discover-row">
        <div className="custom-column-50 custom-image-box">
          <Image
            src={section4Image}
            alt="Natai Hidden Gems"
            fill
            className="custom-img-fill"
            priority
          />
        </div>
        <div className="custom-column-50 custom-text-box">
          <div className="custom-inner-content">
            <div
              className="custom-discover-html"
              dangerouslySetInnerHTML={{
                __html: aboutData.section4_description,
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: section5_description LEFT + section5_image RIGHT */}
      <section className="custom-discover-row custom-reverse">
        <div className="custom-column-50 custom-image-box">
          <Image
            src={section5Image}
            alt="Pristine Shores"
            fill
            className="custom-img-fill"
            priority
          />
        </div>
        <div className="custom-column-50 custom-text-box">
          <div className="custom-inner-content">
            <div
              className="custom-discover-html"
              dangerouslySetInnerHTML={{
                __html: aboutData.section5_description,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoverSection;