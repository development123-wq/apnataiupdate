"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/innerbannerabout.css";

const AboutCommitment = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageBaseUrl = "https://techzenondev.com/apnatai/storage/";

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

  const section5Image = about.section5_image
    ? imageBaseUrl + about.section5_image
    : "/images/about/commitment-fallback.webp";

  // Helper: last word ko span me wrap karo
  const highlightLastWord = (html) => {
    if (!html) return "";
    // sirf first <h2 ...>...</h2> ko target karenge
    return html.replace(
      /(<h2[^>]*>)(.*?)(<\/h2>)/i,
      (match, startTag, inner, endTag) => {
        const textWithoutTags = inner.replace(/<\/?span[^>]*>/g, "");
        const parts = textWithoutTags.trim().split(" ");
        if (parts.length === 0) return match;

        const lastWord = parts.pop();
        const before = parts.join(" ");

        const newInner = `${before} <span style="color:#00e2ee;">${lastWord}</span>`;
        return `${startTag}${newInner}${endTag}`;
      }
    );
  };

  const processedHtml = highlightLastWord(about.section5_description);

  return (
    <section className="inner-banner-new inner-banner-new-three">
      <div
        className="banner-overlay"
        style={{
          paddingTop: "15px",
          backgroundImage: `url(${section5Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "260px",
        }}
      >
        <div
          className="banner-content-html"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            color: "#ffffff",
          }}
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>
    </section>
  );
};

export default AboutCommitment;
