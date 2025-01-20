import React, { useState, useEffect } from "react";
import "./ElectionCard.css";
import CardImg from "../../../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { fetchNews } from '../../../config/config';
import { getImageUrl } from '../../../utils/imageUtils';

const NewsCard = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news || news.length === 0) return <p>No news articles available.</p>;

  // Sort news by ID in descending order and show only the latest 2 news items
  const latestNews = [...news].sort((a, b) => b.id - a.id).slice(0, 2);

  return (
    <div className="cards-container">
      {latestNews.map((article) => (
        <div className="card" key={article.id}>
          <div className="badge">{article.district?.name || "सागर"}</div>
          <div className="image-container">
            <img
              src={article.imageUrl ? getImageUrl(article.imageUrl) : CardImg}
              alt={article.title}
              className="election-card-new-image"
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
              <button 
                className="read-more-btn"
                onClick={() => {
                  console.log('Navigating to article:', article);
                  navigate(`/news/${article.id}`, { 
                    state: { 
                      article: article,
                      category: 'election'
                    }
                  });
                }}
              >
                और पढ़ें
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
