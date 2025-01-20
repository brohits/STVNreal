import React, { useState, useEffect } from 'react';
import './VideoSection.css';
import { BsPlayCircle } from 'react-icons/bs';
import { IoShareSocialOutline } from 'react-icons/io5';
import CardImg from "../../../assets/News1 6.png";
import { fetchNews } from '../../../config/config';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils/imageUtils';

const VideoSection = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNews();
        // Filter news items that have video URLs and sort by ID in descending order
        const videoNews = newsData
          .filter(news => news.videoUrl && news.videoUrl.trim() !== '')
          .sort((a, b) => b.id - a.id); // Sort by ID in descending order
        setVideos(videoNews);
      } catch (err) {
        console.error('Error loading videos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले`;
    if (diffInHours < 48) return 'कल';
    return `${Math.floor(diffInHours / 24)} दिन पहले`;
  };

  const handleShare = (e, video) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.content,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Failed to copy:', err));
    }
  };

  if (loading) return <div className="video-section">Loading videos...</div>;
  if (error) return <div className="video-section">Error: {error}</div>;
  if (!videos || videos.length === 0) return <div className="video-section">No videos available</div>;

  // Get only the first 3 videos
  const displayVideos = videos.slice(0, 3);

  return (
    <div className="video-section">
      <div className="video-section-title-container">
        <h2 className="video-section-title">Viral Videos</h2>
        <div className="gradient-underline"></div>
      </div>
      <div className="video-grid">
        {displayVideos.map((video) => (
          <div key={video.id} className="video-card">
            {playingVideoId === video.id ? (
              <div className="video-player-container">
                <video
                  className="video-player"
                  controls
                  autoPlay
                  src={video.videoUrl}
                  onEnded={() => setPlayingVideoId(null)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div 
                className="video-thumbnail-container"
                onClick={() => setPlayingVideoId(video.id)}
              >
                <img
                  src={video.imageUrl ? getImageUrl(video.imageUrl) : CardImg}
                  alt={video.title}
                  className="video-thumbnail"
                  onError={(e) => {e.target.src = CardImg}}
                />
                <div className="play-icon">
                  <BsPlayCircle />
                </div>
              </div>
            )}
            <div className="video-info">
              <div className="video-location">{video.district?.name || "सागर"}</div>
              <h3 className="video-title">{video.title}</h3>
              <div className="video-metadata">
                <span className="video-time">{formatDate(video.createdAt)}</span>
                <button 
                  className="share-button"
                  onClick={(e) => handleShare(e, video)}
                  aria-label="Share"
                >
                  <IoShareSocialOutline size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
