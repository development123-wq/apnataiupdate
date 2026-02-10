// app/property/[slug]/page.jsx - FINAL COMPLETE CODE
import { FaPhoneAlt, FaEnvelope,FaWhatsapp,FaShoppingBag, FaMapMarkerAlt, FaInstagram, FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

export const dynamic = "force-dynamic";
import verify from './verified.png';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyGalleryClient from "./PropertyGalleryClient";
import Related from "./related-products";
import Image from "next/image";
import LeaveReply from "./leavereply";
import './propertycustom.css';
import "./property.css";
import imglogo from "../../../public/images/logo/Door-Logo-1-768x768.png";

export default async function PropertyDetail(context) {
  const params = await context.params;
  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return (
      <div style={{ padding: 40 }}>
        <h1 style={{ color: "red", fontSize: 26 }}>Property Not Found</h1>
        <p>Slug is missing or invalid.</p>
      </div>
    );
  }

  /* MAIN PROPERTY API */
  const apiURL = `https://techzenondev.com/apnatai/api/property/${slug}`;
  const res = await fetch(apiURL, { cache: "no-store" });
  const json = await res.json();

  if (!json.status || !json.data) {
    return (
      <div style={{ padding: 40 }}>
        <h1 style={{ color: "red", fontSize: 26 }}>Property Not Found</h1>
        <p>Slug is invalid.</p>
      </div>
    );
  }

  const data = json.data;
  const bannerBg = `https://techzenondev.com/apnatai/storage/app/public/${data.main_image}`;
  const bannerTitle = slug.replace(/-/g, " ");

  /* RELATED API */
  const lastDigit = slug.slice(-1);
  const relatedURL = `https://techzenondev.com/apnatai/api/properties/slug/${lastDigit}/related`;
  const relatedRes = await fetch(relatedURL, { cache: "no-store" });
  const relatedJson = await relatedRes.json();
  const related = relatedJson?.data || [];

  return (
    <>
      <Header />

      {/* BANNER */}
      <div
        style={{
          width: "100%",
          height: "340px",
          backgroundImage: `url(${bannerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "600",
              marginBottom: "10px",
              textTransform: "capitalize",
            }}
            className="details-heading"
          >
            {bannerTitle}
          </h1>
          <div
            style={{
              background: "#fff",
              padding: "15px 25px",
              borderRadius: "25px",
              width: "fit-content",
              margin: "auto",
              marginBottom: "25px",
            }}
          >
            <p
              style={{
                color: "#00e2ee",
                fontWeight: 600,
                fontSize: "18px",
                margin: 0,
              }}
            >
              {data?.status_type?.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                marginTop: "5px",
                color: "#444",
              }}
            >
              From ฿{Number(data?.min_price || 0).toLocaleString("en-US")} Per Month
            </p>
          </div>
          <a
            style={{
              background: "#00e2ee",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            href="#contactdealer"
          >
            Get a Consultant
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{ padding: "40px 20px", maxWidth: 1200, margin: "auto" }}
        className="rh_content"
      >
        <h2 style={{ fontSize: "26px", fontWeight: 600, marginBottom: "15px" }}>
          {data.title}
        </h2>

        {/* GALLERY + MAIN IMAGE */}
        <PropertyGalleryClient
          title={data.title}
          mainImage={`https://techzenondev.com/apnatai/storage/app/public/${data.main_image}`}
          galleryImages={JSON.parse(data.gallery_images || "[]").map(
            (img) => `https://techzenondev.com/apnatai/storage/app/public/${img}`
          )}
        />

        {/* PROPERTY OVERVIEW */}
        <div
          style={{
            marginTop: 35,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "30px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
            backdropFilter: "blur(10px)",
          }}
          className="ppoverview"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 25,
              paddingBottom: 15,
              borderBottom: "2px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: 6,
                height: 30,
                background: "linear-gradient(135deg, #00e2ee 0%, #0099cc 100%)",
                borderRadius: "0 4px 4px 0",
                marginRight: 12,
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "#1e293b",
                letterSpacing: "-0.02em",
              }}
            >
              Property Overview
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
            }}
           
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: 12,
                border: "1px solid rgba(226,232,240,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#00e2ee",
                  borderRadius: "50%",
                  marginRight: 12,
                  boxShadow: "0 2px 8px rgba(0,226,238,0.4)",
                }}
              />
              <div>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>
                  Property ID
                </div>
                <div style={{ fontSize: 16, color: "#1e293b", fontWeight: 700 }}>
                  {data.property_id}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: 12,
                border: "1px solid rgba(226,232,240,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#10b981",
                  borderRadius: "50%",
                  marginRight: 12,
                  boxShadow: "0 2px 8px rgba(16,185,129,0.4)",
                }}
              />
              <div>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>
                  Location
                </div>
                <div style={{ fontSize: 16, color: "#1e293b", fontWeight: 700 }}>
                  {data.location?.name}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: 12,
                border: "1px solid rgba(226,232,240,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "#f59e0b",
                  borderRadius: "50%",
                  marginRight: 12,
                  boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
                }}
              />
              <div>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>
                  Type
                </div>
                <div style={{ fontSize: 16, color: "#1e293b", fontWeight: 700 }}>
                  {data.type?.name}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: 12,
                border: "1px solid rgba(226,232,240,0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
                  borderRadius: "50%",
                  marginRight: 12,
                  boxShadow: "0 2px 8px rgba(255,107,107,0.4)",
                }}
              />
              <div>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 2 }}>
                  Starting Price
                </div>
                <div style={{ 
                  fontSize: 20, 
                  color: "#1e293b", 
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00e2ee 0%, #0099cc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  ฿{Number(data.min_price).toLocaleString("en-US")}
                </div>
              </div>
            </div>
          </div>
        </div>
 <div 
          style={{ 
            marginTop: 40, 
            display: 'grid', 
            gridTemplateColumns: '1fr 265px', 
            gap: 20, 
            alignItems: 'start'
          }}
           className="custom-desccss"
        >
          {/* LEFT BOX - Property Details */}
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "30px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
              backdropFilter: "blur(10px)",
              minHeight: 600
            }}
            className="details-box"
          >
        {/* DESCRIPTION */}
        {data.description && (
          <>
            <h3 style={{ marginTop: 0, fontSize: 22, fontWeight: 600, color: '#000' }}>
              Description
            </h3>
            <p
              style={{
                marginTop: 10,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#444",
              }}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </>
        )}
            {/* FEATURES */}
            <div style={{ marginBottom: 30 }}>
              <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", marginBottom: 15 }}>
                Features
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 16, lineHeight: 1.7 }}>
                {JSON.parse(data.features || "[]").map((feature, index) => (
                  <li key={index} style={{ color: "#444", marginBottom: 8 }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

        {/* TWO BOX LAYOUT - LEFT CONTENT + RIGHT AGENT */}
       
            

        

            {/* FLOOR PLAN */}
            {data.floor_plan_image && (
              <div style={{ marginBottom: 30 }}>
                <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", marginBottom: 15 }}>
                  Floor Plan
                </h4>
                <img
                  src={`https://techzenondev.com/apnatai/storage/app/public/${data.floor_plan_image}`}
                  style={{ width: "100%", borderRadius: 12 }}
                />
              </div>
            )}

            {/* VIDEO */}
            {(data.video_url || data.video_file) && (
              <div style={{ marginBottom: 30 }}>
                <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", marginBottom: 15 }}>
                  Property Video
                </h4>
                {data.video_url && (
                  <a
                    href={data.video_url}
                    target="_blank"
                    style={{
                      display: "inline-block",
                      marginBottom: 15,
                      color: "#00e2ee",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Watch Video →
                  </a>
                )}
                {data.video_file && (
                  <video controls style={{ width: "100%", borderRadius: 12 }}>
                    <source
                      src={`https://techzenondev.com/apnatai/storage/app/public/${data.video_file}`}
                    />
                  </video>
                )}
              </div>
            )}

            {/* MAP */}
            {data.map_link && (
              <div>
                <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", marginBottom: 15 }}>
                  Map Location
                </h4>
                <div style={{ borderRadius: 12, overflow: "hidden" }}>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(data.map_link)}&output=embed`}
                    style={{ width: "100%", height: "300px", border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT BOX - Agent Details */}
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "30px 20px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
              backdropFilter: "blur(10px)",
              height: "fit-content",
              position: "sticky",
              top: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 25,
                paddingBottom: 15,
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 30,
                  background: "linear-gradient(135deg, #00e2ee 0%, #0099cc 100%)",
                  borderRadius: "0 4px 4px 0",
                  marginRight: 12,
                }}
              />
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>
                Agent Details 
              </h3>
            </div>

            <div style={{ textAlign: "center", marginBottom: 25 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  background: "linear-gradient(135deg, #00e2ee, #0099cc)",
                  margin: "0 auto 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: "white",
                }}
              >
                <Image src={imglogo}
                alt="imglogo"
                className="property-image"
              width="100"
              height="100"
                />
              </div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1e293b",
                  margin: "0 0 5px 0",
                }}
              >
                {data.agent?.title || "Contact Agent"} <Image style={{width:'20px',height:'20px',marginBottom:'-3px'}} src={verify}/>
              </h4>
              <p className='detailagent' style={{ color: "#ffffff",marginLeft:'auto',marginRight:'auto',width:'fit-content',fontSize:'14px',borderRadius:'100px',padding:'2px 7px', fontSize: 14, margin: 0 }}>
                {data.agent?.short_description || "Property consultant"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data.agent?.mobile && (
                <a className="custombtn"
                  href={`tel:${data.agent.mobile}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: 12,
                    color: "#059669",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "#10b981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    <FaPhoneAlt />
                  </div>
                  Call Agent
                </a>
              )}


              {data.agent?.email && (
                <a className="custombtn"
                  href={`mailto:${data.agent.email}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px",
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 12,
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    <FaEnvelope />
                  </div>
                  Send Email
                </a>
              )}
              {data.agent?.whatsapp_number && (
                <a
                className="custombtn"
                  href={`https://wa.me/${data.agent.whatsapp_number}`}
                  target="_blank"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 12,
                    color: "#15803d",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    <FaWhatsapp />
                  </div>
                  WhatsApp
                </a>
              )}
              {/* <a
              className="custombtn"
                href="#contactdealer"
                style={{
                  background: "linear-gradient(135deg, #00e2ee, #0099cc)",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 600,
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(0,226,238,0.3)",
                }}
              >
                💼 Get Consultant
              </a> */}

              {data.agent?.whatsapp_number && (
                 <a
              className="custombtn"
                href={`${data.agent.url}`}
                style={{
                  background: '#00e2ee',
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 500,
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(0,226,238,0.3)",
                }}
              >
                 View My Listings
              </a>
              )}



             
            </div>
                 <LeaveReply />
          </div>
          
        </div>

        {/* RELATED PROPERTIES */}
        {related.length > 0 && (
          <>
            <div style={{ marginTop: 60 }} />
            <h3
              style={{
                marginTop: 0,
                fontSize: 24,
                fontWeight: 600,
                borderLeft: "5px solid #00e2ee",
                paddingLeft: 10,
                color: '#000'
              }}
            >
              Related Properties
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 20,
                marginTop: 20,
              }}
            >
              {related.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={`https://techzenondev.com/apnatai/storage/app/public/${item.main_image}`}
                    style={{
                      width: "100%",
                      height: 170,
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ padding: 15 }}>
                    <h4
                      style={{
                        fontSize: 18,
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      {item.title}
                    </h4>

                    <p style={{ margin: 0, color: "#555" }}>
                      ฿ {Number(item.min_price).toLocaleString("en-US")}
                    </p>

                    <a
                      href={`/property/${item.slug}`}
                      style={{
                        display: "inline-block",
                        marginTop: 10,
                        background: "#00e2ee",
                        padding: "8px 15px",
                        borderRadius: 6,
                        color: "#fff",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Related />
 
      <Footer />
    </>
  );
}
