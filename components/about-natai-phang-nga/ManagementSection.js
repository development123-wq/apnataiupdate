"use client";
import React, { useEffect, useState } from "react";
import "../../public/css/ManagementSection.css";
import "../../public/css/natai-hero.css";

const ManagementSection = () => {
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

  const rawHtml = aboutData.section2_description || "";

  // 1) First h2 + uske baad ke paragraphs hata do; uske baad se hi cards banane hain
  const stripFirstH2Block = (html) => {
    // first <h2 ...> find
    const h2Match = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/i);
    if (!h2Match) return html;

    const afterH2 = html.slice(h2Match.index + h2Match[0].length);
    // h2 ke baad ke <p>...<p> bhi ignore karne hain, jab tak pehla <h3> na aajaye
    const firstH3Index = afterH2.search(/<h3[^>]*>/i);
    if (firstH3Index === -1) {
      // h3 hi nahi mila, to kuch bhi cards ke liye nahi bachega
      return "";
    }
    // h3 se aage ka hi part cards ke liye
    return afterH2.slice(firstH3Index);
  };

  const htmlAfterFirstHeading = stripFirstH2Block(rawHtml);

  // 2) Baaki HTML ko h3 + uske baad ke first paragraph me split karo
  const extractH3Blocks = (html) => {
    const blocks = [];
    if (!html) return blocks;

    // regex se h3 + uske baad ka ek <p> capture
    const regex =
      /(<h3[^>]*>[\s\S]*?<\/h3>)([\s\S]*?)(?=<h3[^>]*>|$)/gi;

    let match;
    while ((match = regex.exec(html)) !== null) {
      const headingHtml = match[1];
      const bodyChunk = match[2] || "";

      // bodyChunk me se sirf first <p> ... </p> nikaal lo
      const pMatch = bodyChunk.match(/<p[^>]*>[\s\S]*?<\/p>/i);
      const paragraphHtml = pMatch ? pMatch[0] : "";

      blocks.push({
        headingHtml,
        paragraphHtml,
      });

      if (blocks.length === 3) break; // sirf 3 boxes chahiye
    }

    return blocks;
  };

  const cardBlocks = extractH3Blocks(htmlAfterFirstHeading);

  return (
    <section className="custom-mgmt-section">
      <div className="custom-mgmt-container">
        {/* Main Heading same design */}
        <h2 className="custom-mgmt-heading">
          Excellence in <span className="custom-highlight">luxury property</span>{" "}
          management
        </h2>

        {/* Cards Grid */}
        <div className="custom-mgmt-grid custom-sec-boxes-info">
          {cardBlocks.map((block, index) => (
            <div key={index} className="custom-mgmt-card-wrapper">
              <div className="custom-mgmt-card">
                <div
                  className="custom-card-title"
                  dangerouslySetInnerHTML={{ __html: block.headingHtml }}
                />
                <div
                  className="custom-card-description"
                  dangerouslySetInnerHTML={{ __html: block.paragraphHtml }}
                />
              </div>
            </div>
          ))}

          {/* Fallback: agar parsing fail ho jaye to kuch bhi na tootey */}
          {cardBlocks.length === 0 && (
            <p style={{ color: "#fff" }}>
              
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManagementSection;