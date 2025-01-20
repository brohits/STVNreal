import React, { useState, useEffect } from "react";
import "./NewsSection.css";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";
import { fetchWithConfig } from "../../../config/api";
import { endpoints } from "../../../config/config";
import "../categoryNews/CategoryNews.css";

const NewsSection = ({ title, categoryId, navigationPath }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchWithConfig(endpoints.news.byCategory(categoryId));
        if (!response.ok) {
          throw new Error(`Failed to fetch ${title} news.`);
        }
        const data = await response.json();
        // Sort news by ID in descending order
        const sortedNews = data ? [...data].sort((a, b) => b.id - a.id) : [];
        setNews(sortedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryId, title]);

  const handleViewMore = () => {
    const encodedPath = encodeURIComponent(navigationPath.replace(/^\//, ''));
    navigate(`/${encodedPath}`);
  };

  if (loading) return <p className="news-loading">Loading news...</p>;
  if (error) return <p className="news-error">Error: {error}</p>;
  if (!news || news.length === 0) return <p className="news-empty">No news articles available.</p>;

  return (
    <div className="news-section">
      <div className="news-section-header">
        <h2 className="news-section-title">{title}</h2>
        <div className="news-gradient-underline"></div>
      </div>
      
      <div className="news-grid">
        {news.slice(0, 4).map((article) => (
          <NewsCard 
            key={article.id} 
            article={article}
            category={title}
          />
        ))}
      </div>

      <div className="news-read-more-container">
        <button 
          className="news-read-more-button"
          onClick={handleViewMore}
        >
          और पढ़ें →
        </button>
      </div>
    </div>
  );
};

export default NewsSection;
