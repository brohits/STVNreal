import React, { useState, useEffect } from "react";
import "./CategoryNews.css";
import { useParams } from "react-router-dom";
import NewsCard from "../landingPage/NewsCard";
import NavBar1 from "../landingPage/NavBar1";
import NavBar2 from "../landingPage/NavBar2";
import Footer from "../landingPage/footer";
import { fetchWithConfig } from "../../../config/api";
import { endpoints } from "../../../config/config";

const CategoryNews = () => {
  const { category, district } = useParams();
  
  // Get the route type and value first
  const routeType = window.location.pathname.includes('/location/') ? 'location' : 'category';
  const value = routeType === 'location' ? district : category;
  const decodedValue = decodeURIComponent(value || '');
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(routeType === 'location' ? 6 : 12);

  const categoryTitles = {
    "राजनीति": "Politics",
    "अपराध": "Crime",
    "खेल": "Sports",
    "मनोरंजन": "Entertainment",
    "राष्ट्रीय": "National",
    "अंतरराष्ट्रीय": "International"
  };

  const reverseCategoryTitles = {
    "Politics": "राजनीति",
    "Crime": "अपराध",
    "Sports": "खेल",
    "Entertainment": "मनोरंजन",
    "National": "राष्ट्रीय",
    "International": "अंतरराष्ट्रीय"
  };

  const englishCategory = categoryTitles[decodedValue] || decodedValue;
  const displayTitle = reverseCategoryTitles[englishCategory] || decodedValue;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let endpoint;
        if (routeType === 'location') {
          endpoint = endpoints.news.byDistrict(decodedValue);
        } else {
          endpoint = endpoints.news.byCategoryName(englishCategory);
        }
        
        const response = await fetchWithConfig(endpoint);
        const data = await response.json();
        const sortedNews = data ? [...data].sort((a, b) => b.id - a.id) : [];
        setNews(sortedNews);
        setHasMore(data && data.length >= itemsPerPage);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    if (decodedValue) {
      fetchNews();
    }
  }, [routeType, decodedValue, englishCategory]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading) return (
    <>
      <NavBar1 />
      <NavBar2 />
      <div className="loading-spinner">Loading...</div>
    </>
  );

  return (
    <div className="category-container">
      <NavBar1 />
      <NavBar2 />
      
      <main className="category-main">
        <div className="category-header">
          <h1 className="category-title">
            {routeType === 'location' ? `${displayTitle} News` : displayTitle}
          </h1>
          <div className="category-gradient-underline"></div>
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="news-grid">
              {news.slice(0, page * itemsPerPage).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
            
            {hasMore && news.length > page * itemsPerPage && (
              <button className="load-more-button" onClick={loadMore}>
                Load More
              </button>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryNews;
