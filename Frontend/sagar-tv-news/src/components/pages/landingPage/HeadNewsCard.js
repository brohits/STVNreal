import React, { useState, useEffect } from "react";
import "./HeadNewsCard.css";
import { fetchWithConfig } from "../../../config/api";
import { getImageUrl } from '../../../utils/imageUtils';
import defaultImage from "../../../assets/News1 6.png";

const HeadNewsCard = () => {
  const [breakingNews, setBreakingNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        console.log('Fetching breaking news...');
        const response = await fetchWithConfig('/news');
        
        if (!response.ok) {
          console.error('Failed to fetch news:', response.status, response.statusText);
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        console.log('All News Data:', data);
        
        // Find the first breaking news, regardless of coverImageUrl
        const breakingNewsItem = Array.isArray(data) 
          ? data.find(item => {
              console.log('Checking news item:', item.id, 'breaking:', item.breaking);
              return item.breaking === true;
            })
          : (data.breaking === true ? data : null);

        console.log('Selected Breaking News:', breakingNewsItem);
        setBreakingNews(breakingNewsItem);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
    // Refresh every 5 minutes
    const interval = setInterval(fetchBreakingNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    console.log('HeadNewsCard: Loading...');
    return <div className="head-news-card loading">Loading...</div>;
  }
  if (error) {
    console.log('HeadNewsCard: Error -', error);
    return <div className="head-news-card error">{error}</div>;
  }
  if (!breakingNews) {
    console.log('HeadNewsCard: No breaking news found');
    return null;
  }

  console.log('HeadNewsCard: Rendering with breaking news -', breakingNews);

  // Use imageUrl if coverImageUrl is not available
  const cardStyle = {
    backgroundImage: `url(${
      breakingNews.coverImageUrl 
        ? getImageUrl(breakingNews.coverImageUrl)
        : breakingNews.imageUrl 
          ? getImageUrl(breakingNews.imageUrl)
          : defaultImage
    })`
  };

  return (
    <div className="head-news-card" style={cardStyle}>
      <div className="head-news-card-overlay"></div>
      <div className="head-news-content">
        <div className="head-news-content-wrapper">
          <div className="breaking-news-badge">Breaking News</div>
          <h2>{breakingNews.title}</h2>
          <p>{breakingNews.content}</p>
          {breakingNews.district && (
            <div className="news-location">
              {breakingNews.district.name}, {breakingNews.district.state}
            </div>
          )}
          {breakingNews.category && (
            <div className="news-category">
              {breakingNews.category.name}
            </div>
          )}
          <div className="news-meta">
            <span className="news-author">{breakingNews.author}</span>
            <span className="news-date">
              {new Date(breakingNews.publishedDate).toLocaleDateString('hi-IN')}
            </span>
          </div>
        </div>
        <div className="head-read-more-section">
          <a href={`/news/${breakingNews.id}`} className="Head-read-more">
            आगे पढ़े
            <div className="read-more-arrow"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeadNewsCard;
