"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../../public/css/AboutSection.css";

const IMAGE_BASE_URL = "https://techzenondev.com/apnatai/storage/app/public/";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "https://techzenondev.com/apnatai/api/about-apnatai/1"
        );
        const result = await response.json();

        console.log("API Response:", result);
        setAboutData(result.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!aboutData) return <div>No data</div>;

  // section1_image dynamic
  const section1Image = aboutData.section1_image
    ? IMAGE_BASE_URL + aboutData.section1_image
    : "/images/image-about-natai.png";

  // h2/h3 ke andar 3 words + next 2 words ko color change
  const highlightTitleWords = (html) => {
    if (!html) return "";

    return html.replace(
      /<(h2|h3)([^>]*)>([\s\S]*?)<\/(h2|h3)>/i,
      (match, tagName, attrs, inner, closingTag) => {
        const stripped = inner.replace(/<\/?span[^>]*>/g, "").trim();
        const words = stripped.split(/\s+/);
        if (words.length <= 3) return match;

        const firstThree = words.slice(0, 3).join(" ");
        const nextTwo = words.slice(3, 5).join(" ");
        const rest = words.slice(5).join(" ");

        const rebuilt =
          `${firstThree}` +
          (nextTwo
            ? ` <span style="color:#00e2ee;">${nextTwo}</span>`
            : "") +
          (rest ? ` ${rest}` : "");

        return `<${tagName}${attrs}>${rebuilt}</${closingTag}>`;
      }
    );
  };

  const processedSection1Desc = highlightTitleWords(
    aboutData.section1_description
  );

  return (
    <>
      {/* ✅ SECTION 1: section1_image LEFT + section1_description RIGHT */}
      <section className="about-section">
        <div className="about-container">
          {/* LEFT: section1_image (dynamic) */}
          {aboutData.section1_image && (
            <div className="about-image">
              <Image
                src={section1Image}
                alt="About Section 1"
                width={600}
                height={400}
                priority
              />
            </div>
          )}

          {/* RIGHT: section1_description (with title word highlighting) */}
          <div className="about-content">
            <p
              className="about-natai-akash"
              style={{ color: "#00E2EE", marginBottom: "8px" }}
            >
              About Natai
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: processedSection1Desc }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;