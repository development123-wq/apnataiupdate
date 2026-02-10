"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import verify from '../../public/images/verified.png';
import "../../public/css/browsecatalog.css";
import imglogo from "../../public/images/logo/Door-Logo-1-768x768.png";
import Beds from "../../public/images/logo-amenities/bedrooms.png";
import Bath from "../../public/images/logo-amenities/bathrooms.png";
import Area from "../../public/images/logo-amenities/areafeet.png";

export default function BrowseCatalog() {
  const itemsPerPage = 6;

  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");

  // 🔥 Convert HTML → plain text
  // 🔥 Convert HTML → plain text + decode entities like &nbsp;
const stripHtml = (html) => {
  if (!html) return "";

  // 1) Remove tags
  let text = String(html).replace(/<[^>]+>/g, "");

  // 2) Decode HTML entities (&nbsp; etc.) using DOM
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  text = textarea.value; // converts &nbsp; to actual non-breaking space, etc. [web:26]

  // 3) Replace non-breaking spaces with normal spaces and normalize spacing
  return text
    .replace(/\u00A0/g, " ")      // NBSP char → normal space
    .replace(/&nbsp;/g, " ")      // safety: if entity still present
    .replace(/\s+/g, " ")         // multiple spaces/newlines → single space
    .trim();
};


  // ✅ Safe number conversion (handles undefined/commas/currency etc.)
  const toNumber = (val) => {
    if (val === null || val === undefined) return 0;
    const n = Number(String(val).replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  // 🔥 Format price with commas
  const formatPrice = (num) => {
    if (!num) return 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 🔥 Fetch API Data
  useEffect(() => {
    fetch("https://techzenondev.com/apnatai/api/properties?property_status_id=1&status=1")
      .then((res) => res.json())
      .then((data) => {
        const array = data?.data?.data;

        if (Array.isArray(array)) {
          setProperties(array);
        } else {
          console.error("API data is not array:", data);
        }
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  const totalItems = properties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔀 Sorting Logic
  const sortItems = (items, order) => {
    const sorted = [...items];

    switch (order) {
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "price-asc":
        return sorted.sort((a, b) => toNumber(a.min_price) - toNumber(b.min_price));
      case "price-desc":
        return sorted.sort((a, b) => toNumber(b.min_price) - toNumber(a.min_price));
      default:
        return items;
    }
  };

  const sortedItems = sortItems(properties, sortOrder);

  // 📌 Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Browse Catalog</title>
      </Head>

      {/* FILTER + SORT */}
      <section className="filterbytotal">
        <div className="filterbar-wrapper">
          <div className="filter-status-bar">
            Showing {indexOfFirstItem + 1} to{" "}
            {indexOfLastItem > totalItems ? totalItems : indexOfLastItem} of{" "}
            {totalItems} properties
          </div>

          <div className="sort-dropdown">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="default">Default Order</option>
              <option value="title-asc">Property Title A to Z</option>
              <option value="title-desc">Property Title Z to A</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* MAIN PROPERTY LIST */}
      <section className="catalog-section">
        <div className="left-column">
          <div className="card-grid">
            {currentItems.map((item, index) => (
              <div className="catalog-card" key={index}>
                <img
                  src={`https://techzenondev.com/apnatai/storage/app/public/${item.main_image}`}
                  alt={item.title}
                />

                <div className="catalog-card-content">
                  <a className="property-title-link" href={`/property/${item.slug}`} >
                  <h3 style={{ marginBottom: "10px" }}>{item.title}</h3></a>
                  {/* ✅ Description thoda bada (approx 2 lines more) */}
                  <p className="catalog-desc">
                    {stripHtml(item.description).substring(0, 160)}...
                  </p>

                  <div className="catalog-features">
                    <div className="detail-item">
                      <Image src={Beds} alt="amenities" /> {item.min_beds} Bedrooms
                    </div>
                    <div className="detail-item">
                      <Image src={Bath} alt="amenities" /> {item.min_baths} Bathrooms
                    </div>
                    <div className="detail-item">
                      <Image src={Area} alt="amenities" /> {item.min_area_sqft} m²
                    </div>
                  </div>
                </div>

                <div className="catalog-card-footer">
                  <div className="price-card">
                  <h5 class="forsale-heading">for Rent</h5>
                  <span className="catalog-price">฿{formatPrice(item.min_price)}</span>
</div>
                  <a
                    href={`/property/${item.slug}`}
                    className="catalog-readmore"
                  >
                    Read More »
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="right-column">
          <h2>Agents List</h2>


          <div className="right-column-one">
            <a href="/agents/antoine-mouille" className="agent-anchor"><Image
              src={imglogo}
              alt="imglogo"
              className="property-image property-image-agent"
              width="100"
              height="100"
            /></a>
            <a href="/agents/antoine-mouille" className="agent-anchor"><h3 style={{ color: "#000" }}>Antoine Mouille <Image style={{width:'20px',height:'20px',marginBottom:'-3px'}} src={verify}/></h3></a>
            <a
              href="mailto:antoine@ap-natai.com" 
              style={{ lineHeight: "35px", color: "#000" }}
            >
              antoine@ap-natai.com
            </a>
            <br />
            <a href="tel:+660819799307" className="namenumber" style={{ color: "#000" }}>
              +66 (0) 81 979 9307
            </a>
          </div>
       


          <div className="right-column-one">
           <a href="/agents/lou-mouille" className="agent-anchor"> <Image
              src={imglogo}
              alt="imglogo"
              className="property-image property-image-agent"
              width="100"
              height="100"
            /></a>
           <a href="/agents/lou-mouille" className="agent-anchor"> <h3 style={{ color: "#000" }}>Lou Mouille <Image style={{width:'20px',height:'20px',marginBottom:'-3px'}} src={verify}/></h3></a>
            <a
              href="mailto:lou@ap-natai.com"
              style={{ lineHeight: "35px", color: "#000" }}
            >
              lou@ap-natai.com
            </a>
            <br />
            <a href="tel:+660980218331" className="namenumber" style={{ color: "#000" }}>
              +66 (0) 98 021 8331
            </a>
          </div>
          
        </div>
      </section>
    </>
  );
}
