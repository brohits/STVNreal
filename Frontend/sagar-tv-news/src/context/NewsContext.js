import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchNews } from '../config/config';

const NewsContext = createContext();

export const useNews = () => {
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => {
  const [allNews, setAllNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState({});
  const [locationNews, setLocationNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  const processCategoryNews = useCallback((newsData) => {
    // Category mappings
    const categoryMappings = {
      'राजनीति': 3,
      'अपराध': 2,
      'खेल': 1,
      'मनोरंजन': 10,
      'राष्ट्रीय': 4,
      'अंतरराष्ट्रीय': 5
    };

    // Create reverse mapping for easy lookup
    const reverseCategoryMapping = Object.entries(categoryMappings).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});

    // Process news by category
    const newsByCategory = {};
    newsData.forEach(news => {
      if (news.category && news.category.id) {
        const categoryName = reverseCategoryMapping[news.category.id];
        if (categoryName) {
          if (!newsByCategory[categoryName]) {
            newsByCategory[categoryName] = [];
          }
          newsByCategory[categoryName].push(news);
        }
      }
    });

    // Sort news within each category
    Object.keys(newsByCategory).forEach(category => {
      newsByCategory[category].sort((a, b) => b.id - a.id);
    });

    return newsByCategory;
  }, []);

  const processLocationNews = useCallback((newsData) => {
    // Group news by district
    const newsByLocation = {};
    newsData.forEach(news => {
      if (news.district && news.district.name) {
        const location = news.district.name;
        if (!newsByLocation[location]) {
          newsByLocation[location] = [];
        }
        newsByLocation[location].push(news);
      }
    });

    // Sort news within each location
    Object.keys(newsByLocation).forEach(location => {
      newsByLocation[location].sort((a, b) => b.id - a.id);
    });

    return newsByLocation;
  }, []);

  const fetchAllNews = useCallback(async (force = false) => {
    try {
      // Check if cache is still valid
      if (!force && lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
        return;
      }

      setLoading(true);
      const newsData = await fetchNews();
      
      // Update all states with the fetched data
      setAllNews(newsData);
      setCategoryNews(processCategoryNews(newsData));
      setLocationNews(processLocationNews(newsData));
      setLastFetchTime(Date.now());
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lastFetchTime, processCategoryNews, processLocationNews]);

  // Initial fetch
  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  return (
    <NewsContext.Provider value={{
      allNews,
      categoryNews,
      locationNews,
      loading,
      error,
      refreshNews: () => fetchAllNews(true)
    }}>
      {children}
    </NewsContext.Provider>
  );
};
