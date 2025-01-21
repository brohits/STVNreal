import React, { useState, useEffect } from 'react';
import './NewsDetail.css';
import { useLocation, useParams, Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import NavBar1 from '../landingPage/NavBar1';
import NavBar2 from '../landingPage/NavBar2';
import { getImageUrl } from '../../../utils/imageUtils';
import { fetchWithConfig } from '../../../config/api';

const getCategoryName = (category) => {
  const categoryMap = {
    'election': 'चुनाव',
    'election2': 'चुनाव',
    'politics': 'राजनीति',
    'crime': 'अपराध',
    'sports': 'खेल',
    'entertainment': 'मनोरंजन',
    'national': 'राष्ट्रीय',
    'international': 'अंतर्राष्ट्रीय',
    'location': 'स्थानीय समाचार'
  };
  return categoryMap[category] || category;
};

const NewsDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  console.log('Route params - id:', id);
  console.log('Location state:', state);
  const [article, setArticle] = useState(state?.article || null);
  const [loading, setLoading] = useState(!state?.article);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!article && id) {
        try {
          setLoading(true);
          console.log('Fetching article with id:', id);
          const response = await fetchWithConfig(`/news/${id}`);
          console.log('Response status:', response.status);
          if (!response.ok) {
            throw new Error('Article not found');
          }
          const data = await response.json();
          console.log('Fetched article data:', data);
          setArticle(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching article:', err);
          setError(err.message);
          setArticle(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [id, article]);

  if (loading) {
    return (
      <>
        <NavBar1 />
        <NavBar2 />
        <div className="news-detail-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <NavBar1 />
        <NavBar2 />
        <div className="news-detail-container error-message">
          <h2>Article not found</h2>
          <p>{error}</p>
          <Link to="/" className="back-home-link">
            <IoHomeOutline /> Back to Home
          </Link>
        </div>
      </>
    );
  }

  const category = state?.category || 'news';
  const categoryName = getCategoryName(category);

  return (
    <>
      <NavBar1 />
      <NavBar2 />
      <div className="news-detail-container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            <IoHomeOutline className="breadcrumb-icon" />
            <span>होम</span>
          </Link>
          <MdKeyboardArrowRight className="breadcrumb-separator" />
          <span className="breadcrumb-item current">
            {article?.title ? (
              article.title.length > 50 
                ? article.title.substring(0, 50) + '...' 
                : article.title
            ) : 'Loading...'}
          </span>
        </div>

        <div className="news-detail-content">
          <div className="news-detail-main">
            <div className="news-detail-paper">
              {/* Category */}
              {state?.category && (
                <div className="news-category">
                  {categoryName}
                </div>
              )}

              {/* Heading */}
              <h1 className="news-title">
                {article?.title || 'Loading...'}
              </h1>

              {/* Date and Reporter */}
              <div className="news-metadata">
                {/* <p className="news-info">
                  {article?.date ? (
                    `${new Date(article.date).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'Asia/Kolkata',
                      hour12: false
                    })} IST | Reported by ${article.author || "Unknown"}`
                  ) : 'Loading...'}
                </p> */}
              </div>

              {/* Main Image or Video */}
              <div className="news-image-container">
                {article?.videoUrl ? (
                  <video 
                    controls 
                    className="news-main-video"
                    style={{ width: '100%', maxHeight: '500px' }}
                  >
                    <source src={article.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={article?.imageUrl ? getImageUrl(article.imageUrl) : '/fallback-image.jpg'}
                    alt={article?.title || 'News Image'}
                    className="news-main-image"
                    onError={(e) => {
                      e.target.src = '/fallback-image.jpg';
                      e.target.onerror = null;
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="news-content">
                {article?.content ? (
                  article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>Loading content...</p>
                )}
                
                {/* Full Content */}
                {article?.fullContent && (
                  <div className="full-content">
                    {article.fullContent.split('\n\n').map((paragraph, index) => (
                      <p key={`full-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Share Button */}
              <div className="news-share">
                <button
                  onClick={() => {
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
                  }}
                  className="share-button"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="news-detail-sidebar">
            <div className="advertisement-section">
              <h2>Advertisements</h2>
              <div className="ad-space">
                {/* Ad content will go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
