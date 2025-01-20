import React from "react";
import "./HeadNewsCard.css";

const HeadNewsCard = ({ news }) => {
  const cardStyle = news?.coverImageUrl
    ? { backgroundImage: `url(${news.coverImageUrl})` }
    : {};
    console.log('News data:', news);
console.log('Cover Image URL:', news?.coverImageUrl);

  return (
    
    <div className="head-news-card" style={cardStyle}>
      <div className="head-news-card-overlay"></div>
      <div className="head-news-content">
        <div className="head-news-content-wrapper">
          <h2>{news?.title || "नीलामी में किया हाथ साफ, पूरे बिक गए खिलाड़ी"}</h2>
          {news?.description ? (
            <p>{news.description}</p>
          ) : (
            <ul className="head-newsCard-list">
              <li>ऋषभ पंत 27 करोड़ में बिके</li>
              <li>पृथ्वी शॉ को किसी ने नहीं चुना</li>
            </ul>
          )}
        </div>
        <div className="head-read-more-section">
          <a href={`/news/${news?.id || "#"}`} className="Head-read-more">
            आगे पढ़े
            <div className="read-more-arrow"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeadNewsCard;
