'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import '../../public/css/browsecatalog.css';
import imglogo from "../../public/images/logo/Door-Logo-1-768x768.png";

export default function BlogPage() {
  const itemsPerPage = 5; // No pagination, show all
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔥 Convert HTML → plain text + decode entities like &nbsp;
  const stripHtml = (html) => {
    if (!html) return "";
    let text = String(html).replace(/<[^>]+>/g, "");
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    text = textarea.value;
    return text
      .replace(/\u00A0/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // 🔹 Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://techzenondev.com/apnatai/api/blogs-active');
        if (response.data.status && response.data.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // 🔍 Filter based on search
  const filteredPosts = blogs.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog Page</title>
      </Head>

      {/* MAIN LAYOUT: LEFT (BLOGS) + RIGHT (SEARCH + RECENT + AGENTS) */}
      <section className="catalog-section">
        {/* LEFT: BLOG POSTS (Cards jaisa before) */}
        <div className="left-column">
          <div className="card-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((item, index) => (
                <div className="catalog-card" key={index}>
                  {/* 🖼 Blog Image */}
                  <div className="image-wrapper">
                    <img
                      src={
                        item.image
                          ? `https://techzenondev.com/apnatai/public/${item.image}`
                          : '/images/property/pro1.png'
                      }
                      alt={item.title}
                    />
                    <span className="date-overlay">
                      {new Date(item.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* 🧾 Title + Description */}
                  <div className="catalog-card-content">
                    <h3 style={{marginBottom: '10px'}}>{item.title}</h3>
                    <p className="catalog-desc">
                      {stripHtml(item.description).substring(0, 160)}...
                    </p>
                  </div>

                  {/* 🔗 Read More Button */}
                  <div className="catalog-card-footer">
                    <a href="#" className="catalog-readmore">
                      Read More »
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%' }}>No blogs found.</p>
            )}
          </div>
        </div>

        {/* RIGHT: SEARCH + RECENT POSTS + AGENTS */}
        <div className="right-column">
          {/* 1. Search Blog */}
          <div className="right-customheading">
            <h2>Search Blog</h2>
            <div className="search-box">
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button style={{
                  background: '#00e2ee',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* 2. Recent Posts */}
          <div style={{ marginTop: '40px' }} className="right-customheading">
            <h2>Recent Posts</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {blogs.slice(0, 5).map((item, index) => (
                <li key={index} style={{ 
                  marginBottom: '15px', 
                  padding: '8px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="#" style={{ 
                    textDecoration: 'none', 
                    color: '#333',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    {item.title.length > 50 ? item.title.substring(0, 50) + '...' : item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Agents List */}
          <div style={{ marginTop: '40px' }} className="right-customheading">
            <h2>Agents List</h2>

            <a href="/agents/antoine-mouille" className="agent-anchor">
              <div className="right-column-one">
                <Image
                  src={imglogo}
                  alt="imglogo"
                  className="property-image"
                  width="100"
                  height="100"
                />
                <h3 style={{ color: "#000" }}>Antoine Mouille</h3>
                <a href="mailto:antoine@ap-natai.com" style={{ lineHeight: "35px", color: "#000" }}>
                  antoine@ap-natai.com
                </a>
                <br />
                <a href="tel:+660819799307" style={{ color: "#000" }} className="namenumber">
                  +66 (0) 81 979 9307
                </a>
              </div>
            </a>

            <a href="/agents/lou-mouille" className="agent-anchor" style={{ marginTop: '20px', display: 'block' }}>
              <div className="right-column-one">
                <Image
                  src={imglogo}
                  alt="imglogo"
                  className="property-image"
                  width="100"
                  height="100"
                />
                <h3 style={{ color: "#000" }}>Lou Mouille</h3>
                <a href="mailto:lou@ap-natai.com" style={{ lineHeight: "35px", color: "#000" }}>
                  lou@ap-natai.com
                </a>
                <br />
                <a href="tel:+660980218331" style={{ color: "#000" }} className="namenumber">
                  +66 (0) 98 021 8331
                </a>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 🖌 Custom Styling */}
      <style jsx>{`
        .image-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        .image-wrapper img {
          width: 100%;
          border-radius: 6px;
          display: block;
          object-fit: cover;
        }
        .date-overlay {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 4px 8px;
          border-radius: 10px;
          font-size: 13px;
        }
        .search-box {
          margin-top: 10px;
        }
        .search-box input {
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          outline: none;
          transition: 0.2s ease;
        }
        .search-box input:focus {
          border-color: #00e2ee;
          box-shadow: 0 0 4px rgba(0, 112, 243, 0.3);
        }
        .agent-anchor {
          display: block;
          margin-bottom: 20px;
          text-decoration: none;
        }
        .right-column-one {
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          transition: box-shadow 0.2s;
        }
        .right-column-one:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .property-image {
          border-radius: 50%;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 20px;
          margin-bottom: 20px;
          color: #333;
        }
        ul li:last-child {
          border-bottom: none;
        }
        @media (max-width: 768px) {
          .catalog-section {
            flex-direction: column;
          }
          .left-column, .right-column {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
