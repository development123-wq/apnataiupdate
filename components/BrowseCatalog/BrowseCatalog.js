"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import verify from '../../public/images/verified.png';
import Image from "next/image";
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
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // 🔥 Convert HTML → plain text
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  };

  // ✅ Safe number conversion
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

  // 🔥 FIXED API Fetch with ALL possible fixes
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // 🔥 Multiple endpoints try karo (Postman wala structure)
        const endpoints = [
          "https://techzenondev.com/apnatai/api/properties?per_page=100",
          "https://techzenondev.com/apnatai/api/properties",
          "/api/properties" // Next.js proxy
        ];

        let data = null;

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
              },
              cache: 'no-store', // Fresh data
            });

            if (!response.ok) {
              console.log(`Endpoint failed: ${endpoint}, Status: ${response.status}`);
              continue;
            }

            data = await response.json();
            console.log(`✅ SUCCESS from ${endpoint}:`, data);
            break;
          } catch (error) {
            console.log(`Endpoint error ${endpoint}:`, error.message);
            continue;
          }
        }

        if (!data) {
          throw new Error("All endpoints failed");
        }

        // 🔥 ALL possible data paths (Postman structure match karo)
        let propertiesArray = [];
        let total = 0;

        // Common API structures
        propertiesArray = data.data?.data || 
                         data.data || 
                         data.properties || 
                         data.items || 
                         data.results || 
                         data || [];

        // Total count bhi set karo
        total = data.total || data.count || propertiesArray.length;

        console.log("📊 Final properties:", propertiesArray.length);
        console.log("📊 Total count:", total);

        if (Array.isArray(propertiesArray)) {
          setProperties(propertiesArray);
          setTotalCount(total);
        } else {
          console.error("❌ Not an array:", propertiesArray);
          setProperties([]);
        }

      } catch (error) {
        console.error("🚨 API Error:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const totalItems = totalCount || properties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 🔀 Sorting Logic
  const sortItems = (items, order) => {
    const sorted = [...items];
    switch (order) {
      case "title-asc":
        return sorted.sort((a, b) => a.title?.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title?.localeCompare(a.title));
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

  // 🔥 Loading state
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontSize: '18px' }}>
        🔄 Loading properties...
      </div>
    );
  }

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
            <strong>{totalItems}</strong> properties
            {totalItems === 0 && <span style={{color: 'red'}}> (Check Console!)</span>}
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
          {totalItems === 0 ? (
            <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>
              <h3>❌ No properties found</h3>
              <p>Check browser console (F12) for API response details</p>
              <button 
                onClick={() => window.location.reload()} 
                className="catalog-readmore"
                style={{ marginTop: '20px' }}
              >
                🔄 Retry
              </button>
            </div>
          ) : (
            <>
              <div className="card-grid">
                {currentItems.map((item, index) => (
                  <div className="catalog-card" key={item.id || item.slug || index}>
                    <img
                      src={`https://techzenondev.com/apnatai/storage/app/public/${item.main_image}`}
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = '/images/fallback-property.jpg'; // Fallback image
                      }}
                    />

                    <div className="catalog-card-content">
                      <a href={`/property/${item.slug}`}> 
                        <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
                      </a>

                      <p className="catalog-desc">
                        {stripHtml(item.description).substring(0, 160)}...
                      </p>

                      <div className="catalog-features">
                        <div className="detail-item">
                          <Image src={Beds} alt="Beds" /> {item.min_beds || 0} Bedrooms
                        </div>
                        <div className="detail-item">
                          <Image src={Bath} alt="Bathrooms" /> {item.min_baths || 0} Bathrooms
                        </div>
                        <div className="detail-item">
                          <Image src={Area} alt="Area" /> {item.min_area_sqft || 0} m²
                        </div>
                      </div>
                    </div>

                    <div className="catalog-card-footer">
                      <span className="catalog-price">฿{formatPrice(item.min_price)}</span>
                      <a href={`/property/${item.slug}`} className="catalog-readmore">
                        Read More »
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
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
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR - Agents */}
        <div className="right-column">
          <h2>Agents List</h2>

          <div className="right-column-one">
            <a href="/agents/antoine-mouille" className="agent-anchor">
              <Image
                src={imglogo}
                alt="Antoine Mouille"
                className="property-image property-image-agent"
                width="100"
                height="100"
              />
            </a>
            <a href="/agents/antoine-mouille" className="agent-anchor">
              <h3 style={{ color: "#000" }}>
                Antoine Mouille 
                <Image style={{width:'20px',height:'20px',marginBottom:'-3px'}} src={verify}/>
              </h3> 
            </a>
            <a href="mailto:antoine@ap-natai.com" style={{ lineHeight: "35px", color: "#000" }}>
              antoine@ap-natai.com
            </a>
            <br />
            <a href="tel:+660819799307" className="namenumber" style={{ color: "#000" }}>
              +66 (0) 81 979 9307
            </a>
          </div>

          <div className="right-column-one">
            <a href="/agents/lou-mouille" className="agent-anchor">
              <Image
                src={imglogo}
                alt="Lou Mouille"
                className="property-image property-image-agent"
                width="100"
                height="100"
              />
            </a>
            <a href="/agents/lou-mouille" className="agent-anchor">
              <h3 style={{ color: "#000" }}>
                Lou Mouille 
                <Image style={{width:'20px',height:'20px',marginBottom:'-3px'}} src={verify}/>
              </h3>
            </a>
            <a href="mailto:lou@ap-natai.com" style={{ lineHeight: "35px", color: "#000" }}>
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
