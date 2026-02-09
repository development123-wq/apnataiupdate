'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../public/css/Banner.css';

const Banner = () => {
  const router = useRouter();

  const staticBanner = {
    image: '/images/banner/bottomhero.jpg',
    titleSmall: '',
    titleLarge: 'For Rent Property',
    buttonText: 'Learn More',
    buttonLink: '/contact', // e.g. 'https://techzenondev.com/apnatai/api/property-types?page=1' (optional)
  };

  // Dropdown Data (For Rent)
  const [propertyTypes, setPropertyTypes] = useState([]);

  // For Rent budgets (API)
  const [rentBudgets, setRentBudgets] = useState([]);
  const [rentBudget, setRentBudget] = useState('');

  // For Rent form states
  const [rentType, setRentType] = useState('');
  const [checkin, setCheckin] = useState('');  // ✅ Changed to empty
  const [checkout, setCheckout] = useState('');
  const [rentGuests, setRentGuests] = useState('6');

  // ✅ Calculate today's date and tomorrow's date for min values
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().split('T')[0];
  };

  // ✅ Set initial future dates on component mount
  useEffect(() => {
    const today = getTodayDate();
    const tomorrow = getTomorrowDate();
    setCheckin(today);
    setCheckout(tomorrow);
  }, []);

  // FETCH PROPERTY TYPES (used in rent form)
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/property-types?page=1'
        );
        const types = res?.data?.data?.data;

        if (Array.isArray(types)) {
          setPropertyTypes(types);
          if (types.length > 0) {
            setRentType(types[0].id.toString());
          }
        }
      } catch (err) {
        console.error('Error fetching property types:', err);
      }
    };

    fetchTypes();
  }, []);

  // FETCH RENT BUDGETS (For Rent)
  useEffect(() => {
    const fetchRentBudgets = async () => {
      try {
        const res = await axios.get(
          'https://techzenondev.com/apnatai/api/for-rent-budget/1/edit'
        );
        const budgetsArr = res?.data?.data?.budgets;

        if (Array.isArray(budgetsArr)) {
          setRentBudgets(budgetsArr);
          if (budgetsArr.length > 0) {
            setRentBudget(`${budgetsArr[0].min}-${budgetsArr[0].max}`);
          }
        } else {
          setRentBudgets([]);
          setRentBudget('');
        }
      } catch (err) {
        console.error('Error fetching rent budgets:', err);
        setRentBudgets([]);
        setRentBudget('');
      }
    };

    fetchRentBudgets();
  }, []);

  // HANDLE RENT SEARCH
  const handleRentSearch = (e) => {
    e.preventDefault();

    const qs =
      `type=${encodeURIComponent(rentType)}` +
      `&checkin=${encodeURIComponent(checkin)}` +
      (checkout ? `&checkout=${encodeURIComponent(checkout)}` : `&checkout`) +
      `&guests=${encodeURIComponent(rentGuests)}` +
      `&budget=${encodeURIComponent(rentBudget)}`;

    router.push(`/search-for-real-estate?${qs}`);
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${staticBanner.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        height: '83vh',
      }}
    >
      <div className="overlay"></div>

      <div className="banner-content">
        {/* LEFT: TEXT */}
        <div className="center-text banner-center-text fade-in" style={{textAlign:'left'}}>
          <h2>{staticBanner.titleSmall}</h2>
          <h1 className="titlelarge-custom">{staticBanner.titleLarge || 'For Rent Property'}</h1>
          {staticBanner.buttonLink ? (
            <a href={staticBanner.buttonLink} target="_blank" rel="noopener noreferrer">
              <button className="learn-more">{staticBanner.buttonText}</button>
            </a>
          ) : (
            <button className="learn-more">{staticBanner.buttonText}</button>
          )}
        </div>
        

        {/* RIGHT: FOR RENT FORM */}
        <div className="form-box">
          <div className="form-title form-title-one">
            <p className="rent-label">For Rent</p>
          </div>

          <form onSubmit={handleRentSearch} className="formbannercustom">
            <label>Property Type</label>
            <select value={rentType} onChange={(e) => setRentType(e.target.value)}>
              {propertyTypes.length > 0 ? (
                propertyTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <div className="date-row">
              <div className="date-field">
                <label>Check-in Date</label>
                <input
                  type="date"
                  value={checkin}
                  min={getTodayDate()}  // ✅ Only future dates
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>

              <div className="date-field">
                <label>Check-out Date</label>
                <input
                  type="date"
                  value={checkout}
                  min={checkin || getTomorrowDate()}  // ✅ After check-in date
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>

            <label>Number Of Guests</label>
            <select value={rentGuests} onChange={(e) => setRentGuests(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <label>Budget</label>
            <select value={rentBudget} onChange={(e) => setRentBudget(e.target.value)}>
              {rentBudgets.length > 0 ? (
                rentBudgets.map((b, idx) => {
                  const val = `${b.min}-${b.max}`;
                  const minLabel = Number.isFinite(Number(b.min))
                    ? Number(b.min).toLocaleString()
                    : b.min;
                  const maxLabel = Number.isFinite(Number(b.max))
                    ? Number(b.max).toLocaleString()
                    : b.max;

                  return (
                    <option key={idx} value={val}>
                      ฿{minLabel} - ฿{maxLabel}
                    </option>
                  );
                })
              ) : (
                <option value="">Loading...</option>
              )}
            </select>

            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
