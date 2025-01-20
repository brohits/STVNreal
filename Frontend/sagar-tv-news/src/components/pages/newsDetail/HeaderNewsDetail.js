import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { getImageUrl } from '../../../utils/imageUtils';
import CardImg from "../../../assets/News1 6.png";
import "./HeaderNewsDetail.css";

const HeaderNewsDetail = () => {
  const location = useLocation();
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // If article is passed through navigation state, use it
    if (location.state?.article) {
      setArticle(location.state.article);
    } else {
      // Fetch article using ID if not passed through state
      // You can implement your fetch logic here
      console.log("Fetching article with ID:", id);
    }
  }, [location.state, id]);

  if (!article) {
    return <div className="loading">Loading...</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard:', error));
    }
  };

  return (
    <div className="header-news-detail">
      <div className="detail-container">
        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <div className="author-date">
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
            <button className="share-button" onClick={handleShare}>
              <IoShareSocialOutline /> Share
            </button>
          </div>
        </div>

        <div className="article-image-container">
          <img
            src={article.imageUrl ? getImageUrl(article.imageUrl) : CardImg}
            alt={article.title}
            className="article-image"
            onError={(e) => {e.target.src = CardImg}}
          />
          {article.district?.name && (
            <div className="location-badge">{article.district.name}</div>
          )}
        </div>

        <div className="article-content">
          <p className="content-text">{article.content}</p>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderNewsDetail; 