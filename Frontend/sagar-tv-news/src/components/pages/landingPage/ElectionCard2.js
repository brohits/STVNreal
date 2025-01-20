import React, {useState, useEffect} from "react";
import "./ElectionCard2.css";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { fetchNews } from '../../../config/config';

const ElectionCard2 = () => {
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

    // Sort news by ID in descending order, skip the first 2 latest news and show the next 3
    const newsToShow = [...news].sort((a, b) => b.id - a.id).slice(2, 5);

    return (
      <div className="cards-container2">
        {newsToShow.map((article) => (
          <div className="card2" key={article.id}>
            <div className="badge2">{article.district?.name || "सागर"}</div>
            <img
              src={article.imageUrl || CardImg2}
              alt={article.title}
              className="card-image2"
              onError={(e) => {e.target.src = CardImg2}}
            />
            <div className="card-content2">
              <h2 className="card-title2">{article.title}</h2>
              <p className="card-description2">
                {article.content}
              </p>
              <div className="card-footer2">
                <div className="author-info2">
                  <span className="author2">By {article.author || "Unknown"}</span>
                  <span className="date2">
                    <BsCalendar3 className="calendar-icon2" />
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
              <div className="card-actions2">
                <IoShareSocialOutline 
                  className="share-icon2" 
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
                  className="read-more-btn2"
                  onClick={() => {
                    console.log('Article data:', article); 
                    navigate(`/news/${article.id}`, { 
                      state: { 
                        article: article,
                        category: 'election2'
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

export default ElectionCard2;
