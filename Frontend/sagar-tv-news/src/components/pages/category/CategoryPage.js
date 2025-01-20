import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../landingPage/NewsCard";
import NavBar1 from "../landingPage/NavBar1";
import NavBar2 from "../landingPage/NavBar2";
import Footer from "../landingPage/footer";
import { endpoints } from "../../../config/config";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  const categoryTitles = {
    "राजनीति": "Politics",
    "अपराध": "Crime",
    "खेल": "Sports",
    "मनोरंजन": "Entertainment",
    "राष्ट्रीय": "National",
    "अंतरराष्ट्रीय": "International"
  };

  const englishTitle = categoryTitles[categoryName] || categoryName;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.news.byCategoryName(englishTitle));
        if (!response.ok) {
          throw new Error(`Failed to fetch ${englishTitle} news.`);
        }
        const data = await response.json();
        // Sort news by ID in descending order
        const sortedNews = data ? [...data].sort((a, b) => b.id - a.id) : [];
        setNews(sortedNews);
        setHasMore(sortedNews.length > page * itemsPerPage);
      } catch (err) {
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName, englishTitle]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && page === 1) return <div className="category-loading">Loading news...</div>;
  if (error) return <div className="category-error">Error: {error}</div>;
  if (!news || news.length === 0) return <div className="category-empty">No news articles available.</div>;

  const displayedNews = news.slice(0, page * itemsPerPage);

  return (
    <div className="category-page">
      <NavBar1 />
      <NavBar2 />
      
      <main className="category-main">
        <div className="category-header">
          <h1 className="category-title">{categoryName}</h1>
          <div className="category-gradient-underline"></div>
        </div>

        <div className="category-grid">
          {displayedNews.map((article) => (
            <NewsCard 
              key={article.id} 
              article={article}
              category={englishTitle}
            />
          ))}
        </div>

        {hasMore && !loading && (
          <div className="category-load-more">
            <button 
              className="category-load-more-button"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "और पढ़ें →"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
