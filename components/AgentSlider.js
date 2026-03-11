'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/css/AgentSlider.css';

export default function AgentSlider() {
  const sliderRef = useRef(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredAgentId, setHoveredAgentId] = useState(null);

  const settings = {
    dots: false,
    infinite: agents.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://techzenondev.com/apnatai/api/agents/home');

        if (response.data.status && response.data.data?.data) {
          setAgents(response.data.data.data);
        } else {
          console.error('Unexpected API format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const cleanDescription = (html) => {
    const text = html ? html.replace(/<[^>]+>/g, '') : '';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  if (loading) return null;

  return (
    <div className="agent-wrapper agent-wrapper-two">
      <div className="left-side">
        <h3 className="main-title" style={{ color: '#000' }}>Meet</h3>
        <h2 className="highlight-title">Our Agents</h2>
        <p className="sub-text" style={{ color: '#000', lineHeight: '20px' }}>
          Connect with our expert agents, dedicated to guiding you with clarity, trust, and deep market knowledge.
          Experience seamless support from professionals who prioritize your goals.
        </p>

        <div className="arrows-desktop">
          <button
            type="button"
            className="custom-arrow"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            ❮
          </button>

          <button
            type="button"
            className="custom-arrow"
            onClick={() => sliderRef.current?.slickNext()}
          >
            ❯
          </button>
        </div>
      </div>

      <div className="right-side">
        {agents.length > 0 && (
          <Slider ref={sliderRef} {...settings}>
            {agents.map((agent) => (
              <div key={agent.id || agent.url}>
                <Link
                  href={agent.url || '/agent'}
                  className={`agent-card-wrapper ${hoveredAgentId === agent.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredAgentId(agent.id)}
                  onMouseLeave={() => setHoveredAgentId(null)}
                >
                  <div className="agent-card">
                    <div className="agent-header">
                      <Image
                        src={`https://techzenondev.com/apnatai/public/${agent.image}`}
                        width={80}
                        height={80}
                        alt={agent.name || agent.title}
                        className="agent-img"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                      <div>
                        <h3 className="agent-name" style={{ color: '#000' }}>
                          {agent.title}
                        </h3>

                        <p className="agent-listings">{agent.short_description}</p>

                        <div className="agent-contact-mobile">
                          <a href={`tel:${agent.mobile || agent.phone}`} className="agent-phone">
                            📞 {agent.mobile || agent.phone || '+91 98765 43210'}
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="agent-description" style={{ color: '#000', lineHeight: '20px' }}>
                      {cleanDescription(agent.description)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}