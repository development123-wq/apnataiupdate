"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/natai-hero.css";

const IMAGE_BASE_URL = "https://techzenondev.com/apnatai/storage/app/public/";

const NataiHeroFromApi = () => {
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

  const backgroundImage = "/images/icons/img3.png"; // agar kabhi API se aaye to yahan map kar lena

  // 1) First heading (h2/h3) se start karo, next heading tak ka content hi rakho
  const sliceUntilNextHeading = (html) => {
    if (!html) return "";

    // first h2/h3 dhoondo
    const firstHeadingIndex = html.search(/<h[23][^>]*>/i);
    if (firstHeadingIndex === -1) {
      // heading hi nahi to pura html
      return html;
    }

    const fromFirstHeading = html.slice(firstHeadingIndex);

    // uske baad wali next h2/h3 dhoondo (current ke baad)
    const nextHeadingMatch = fromFirstHeading.slice(1).match(/<h[23][^>]*>/i);
    if (!nextHeadingMatch) {
      // koi next heading nahi, to firstHeading se end tak
      return fromFirstHeading;
    }

    const nextHeadingIndex = 1 + nextHeadingMatch.index;
    return fromFirstHeading.slice(0, nextHeadingIndex);
  };

  // 2) first heading me 3 words normal + next 2 cyan
  const highlightTitleWords = (html) => {
    if (!html) return "";

    return html.replace(
      /<(h2|h3)([^>]*)>([\s\S]*?)<\/(h2|h3)>/i, // sirf pehli h2/h3
      (match, tagName, attrs, inner, closingTag) => {
        // existing spans hata ke plain text
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

  const rawSection2 = aboutData.section2_description;
  const sliced = sliceUntilNextHeading(rawSection2);
  const processedSection2 = highlightTitleWords(sliced);

  return (
    <section
      className="natai-hero"
      style={{ "--bg": `url(${backgroundImage})` }}
      aria-label="Natai hero section"
    >
      <div className="natai-hero__overlay" />
      <div className="natai-hero__content">
        <div
          className="natai-hero__html natai-hero-sec-custom"
          dangerouslySetInnerHTML={{ __html: processedSection2 }}
        />
      </div>
    </section>
  );
};

export default NataiHeroFromApi;
