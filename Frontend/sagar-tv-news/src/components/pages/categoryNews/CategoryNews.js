import React, { useState, useEffect } from "react";
import "./CategoryNews.css";
import "../landingPage/ElectionCard.css"
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
  
  console.log('Route Info:', { routeType, value, decodedValue });

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // 3x2 grid

  // Updated category titles with proper Hindi characters and IDs to match backend
  const categoryMapping = {
    "राजनीति": { id: 3, english: "Politics" },
    "अपराध": { id: 4, english: "Crime" },
    "खेल": { id: 5, english: "Sports" },
    "मनोरंजन": { id: 6, english: "Entertainment" },
    "राष्ट्रीय": { id: 7, english: "National" },
    "अंतरराष्ट्रीय": { id: 8, english: "International" }
  };

  const reverseCategoryTitles = {
    "Politics": "राजनीति",
    "Crime": "अपराध",
    "Sports": "खेल",
    "Entertainment": "मनोरंजन",
    "National": "राष्ट्रीय",
    "International": "अंतरराष्ट्रीय"
  };

  // Get category info
  const categoryInfo = categoryMapping[decodedValue];
  const englishCategory = categoryInfo?.english || decodedValue;
  const displayTitle = reverseCategoryTitles[englishCategory] || decodedValue;

  console.log('Category Info:', { 
    decodedValue,
    englishCategory,
    displayTitle,
    categoryId: categoryInfo?.id,
    hasMapping: !!categoryMapping[decodedValue]
  });

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let endpoint;
        if (routeType === 'location') {
          // For location routes, use the district name directly
          endpoint = `/news/district/name/${encodeURIComponent(decodedValue)}`;
          console.log('Location endpoint:', {
            routeType,
            decodedValue,
            endpoint
          });
        } else {
          const categoryId = categoryInfo?.id;
          if (!categoryId) {
            throw new Error('Invalid category');
          }
          endpoint = endpoints.news.byCategory(categoryId);
        }
        
        console.log('Making API request to:', endpoint);
        
        const response = await fetchWithConfig(endpoint);
        console.log('API Response:', { 
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Raw API Data:', data);

        // Handle both paginated and non-paginated responses
        const newsItems = Array.isArray(data) ? data : (data.content || []);
        
        console.log('Processed news items:', {
          isArray: Array.isArray(data),
          itemsCount: newsItems.length,
          firstItem: newsItems[0]
        });

        // Sort news items by ID in descending order (newest first)
        const sortedNews = newsItems.sort((a, b) => b.id - a.id);

        // For location routes, don't filter by category
        const filteredNews = routeType === 'location' 
          ? sortedNews 
          : sortedNews.filter(article => {
              const articleCategoryId = article.category?.id;
              const matches = articleCategoryId === categoryInfo?.id;
              if (!matches) {
                console.log('Article category mismatch:', {
                  articleId: article.id,
                  articleCategoryId,
                  expectedCategoryId: categoryInfo?.id,
                  articleTitle: article.title
                });
              }
              return matches;
            });

        setNews(filteredNews);
        
        // Set total pages based on the response type
        if (Array.isArray(data)) {
          setTotalPages(Math.ceil(filteredNews.length / itemsPerPage));
        } else {
          setTotalPages(data.totalPages || Math.ceil(filteredNews.length / itemsPerPage));
        }
        
        if (filteredNews.length === 0) {
          setError(`No news articles found ${routeType === 'location' ? 'for ' + decodedValue : 'in this category'}`);
        } else {
          setError(null);
        }
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
  }, [routeType, decodedValue, categoryInfo]);

  // Calculate the current page's news items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return news.slice(startIndex, endIndex);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        ←
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="pagination-dots">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="pagination-dots">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        →
      </button>
    );

    return pages;
  };

  if (loading) return (
    <div>
      <NavBar1 />
      <NavBar2 />
      <div className="loading-spinner">Loading...</div>
    </div>
  );

  return (
    <div className="category-container">
      <NavBar1 />
      <NavBar2 />
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="category-news-wrapper">
            <div className="category-news-header">
              <h1>{routeType === 'location' ? `${decodedValue} News` : displayTitle}</h1>
            </div>
            <div className="category-news-grid">
              {getCurrentPageItems().map(article => (
                <NewsCard 
                  key={article.id} 
                  article={article}
                  category={displayTitle}
                />
              ))}
            </div>
          </div>
          {news.length > itemsPerPage && (
            <div className="pagination-container">
              {renderPagination()}
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default CategoryNews;
