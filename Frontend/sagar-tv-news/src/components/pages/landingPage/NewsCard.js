import React from "react";
import "./NewsCard.css";
import CardImg from "../../../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from '../../../utils/imageUtils';

const NewsCard = ({ news, article, category }) => {
  const navigate = useNavigate();
  // Use either news or article prop
  const newsItem = news || article;

  if (!newsItem) {
    return null; // Return null if no data is provided
  }

  return (
    <div className="card">
      <div className="badge">{newsItem.district?.name || "सागर"}</div>
      <div className="small-news-card-image-container">
        <img
          src={newsItem.imageUrl ? getImageUrl(newsItem.imageUrl) : CardImg}
          alt={newsItem.title}
          className="news-card-image"
          onError={(e) => {e.target.src = CardImg}}
        />
      </div>
      <div className="card-content">
        <h2 
          className="small-news-card-title"
          onClick={() => navigate(`/news/${newsItem.id}`)}
        >
          {newsItem.title}
        </h2>
        <p className="card-description">{newsItem.content}</p>
        <div className="card-footer">
          <div className="author-info">
            <span className="author">By {newsItem.author || "Unknown"}</span>
            <span className="date">
              <BsCalendar3 className="calendar-icon" />
              {new Date(newsItem.publishedDate).toLocaleString('en-IN', {
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
                  title: newsItem.title,
                  text: newsItem.content,
                  url: window.location.href,
                })
                .catch((error) => console.log('Error sharing:', error));
              }
            }}
          />
          <button 
            className="read-more-btn"
            onClick={() => {
              navigate(`/news/${newsItem.id}`, { 
                state: { 
                  article: newsItem,
                  category: category
                }
              });
            }}
          >
            और भी →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
