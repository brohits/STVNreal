import React, { useState } from "react";
import "./LocationBasedSection.css";
import CardImg from "../../../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useNews } from "../../../context/NewsContext";
import { getImageUrl } from '../../../utils/imageUtils';

const LocationBasedSection = () => {
  const navigate = useNavigate();
  const { locationNews, loading, error } = useNews();
  const [activeLocation, setActiveLocation] = useState('Sagar');
  const [searchQuery, setSearchQuery] = useState('');

  // Define allowed locations
  const allowedLocations = ['Sagar', 'Ujjain', 'Gwalior', 'Indore', 'Jabalpur', 'Chambal'];

  const handleLocationChange = (location) => {
    setActiveLocation(location);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredNews = Object.entries(locationNews).reduce((acc, [location, articles]) => {
    // Only include allowed locations
    if (!allowedLocations.includes(location)) return acc;
    
    // Sort articles by ID in descending order and then filter
    const sortedArticles = [...articles].sort((a, b) => b.id - a.id);
    const filteredArticles = sortedArticles.filter(article => 
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.district?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredArticles.length > 0) {
      acc[location] = filteredArticles;
    }
    return acc;
  }, {});

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayedLocations = searchQuery 
    ? Object.keys(filteredNews).filter(location => allowedLocations.includes(location))
    : allowedLocations.filter(location => locationNews[location]?.length > 0);

  return (
    <div className="locationbasedsection-container">
      <h2 className="locationbasedsection-title">District Wise News</h2>
      <div className="gradient-underline"></div>
      <div className="locationbasedsection-NavBar">
        <div className="location-links">
          {displayedLocations.map((location) => (
            <button
              key={location}
              className={`locationbasedsection-NavBar-link ${activeLocation === location ? 'active' : ''}`}
              onClick={() => handleLocationChange(location)}
            >
              {location}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Search news..." 
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="locationbasedsection-news-container">
        <div className="cards-container">
          {searchQuery ? (
            // Show filtered and sorted news from all locations when searching
            Object.entries(filteredNews)
              .flatMap(([location, articles]) => articles)
              .sort((a, b) => b.id - a.id)  // Sort combined results by ID
              .slice(0, 4)
              .map((article, index) => (
                <Card key={article.id} article={article} index={index} />
              ))
          ) : (
            // Show sorted news from active location when not searching
            [...(locationNews[activeLocation] || [])]
              .sort((a, b) => b.id - a.id)
              .slice(0, 4)
              .map((article, index) => (
                <Card key={article.id} article={article} index={index} />
              ))
          )}
        </div>
        <div className="read-more-container">
          <button 
            className="read-more-button"
            onClick={() => navigate(`/location/${encodeURIComponent(activeLocation)}`)}
          >
            और पढ़ें →
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ article, index }) => {
  const navigate = useNavigate();
  
  const handleReadMore = () => {
    navigate(`/news/${article.id}`, {
      state: { 
        article,
        category: 'location'
      }
    });
  };

  return (
    <div className="card" key={index}>
      <div className="badge">{article.district?.name || "सागर"}</div>
      <div className="small-news-card-image-container">
      <img
        src={article.imageUrl ? getImageUrl(article.imageUrl) : CardImg}
        alt={article.title}
        className="location-news-image"
        onError={(e) => {e.target.src = CardImg}}
      />
      </div>
      <div className="card-content">
        <h2 className="card-title">{article.title}</h2>
        <p className="card-description">{article.content}</p>
        <div className="card-footer">
          <div className="author-info">
            <span className="author">By {article.author || "Unknown"}</span>
            <span className="date">
              <BsCalendar3 className="calendar-icon" />
              {new Date(article.publishedDate).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata',
                hour12: false
              })} IST
            </span>
          </div>
        </div>
        <div className="card-actions">
          <button onClick={handleReadMore} className="read-more-btn">और भी</button>
          <IoShareSocialOutline 
            className="share-icon" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.content,
                  url: window.location.href,
                })
                .catch((error) => console.log('Error sharing:', error));
              } else {
                const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.title)}`;
                navigator.clipboard.writeText(shareUrl)
                  .then(() => alert('Link copied to clipboard!'))
                  .catch((error) => console.log('Error copying to clipboard:', error));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationBasedSection;
