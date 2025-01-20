import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { fetchWithConfig } from '../../../config/api';
import { endpoints } from '../../../config/config';

// Components
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import "./NavBar2.css";
import "./SponsoredBanner1.css";
import HeadNewsCard from "./HeadNewsCard";

// Lazy load below-the-fold components
const FeaturedContent = lazy(() => import('./FeaturedContent'));
const NewsArticles = lazy(() => import('./NewsArticles'));
const Videos = lazy(() => import('./Videos'));
const Footer = lazy(() => import('./footer'));
const GoogleAd1 = lazy(() => import('./GoogleAd1'));
const SponsoredBanner1 = lazy(() => import('./SponsoredBanner1'));
const Section1 = lazy(() => import('./Section1'));
const Section2 = lazy(() => import('./Section2'));
const VideoSection = lazy(() => import('./VideoSection'));
const WhatsAppButton = lazy(() => import('./whatsapp'));
const NewsSection = lazy(() => import('./NewsSection'));

const LandingPage = () => {
  const [headNews, setHeadNews] = useState(null);

  useEffect(() => {
    const fetchHeadNews = async () => {
      try {
        const response = await fetchWithConfig(endpoints.news.all);
        const data = await response.json();
        const newsItems = Array.isArray(data) ? data : (data.content || []);
        // Get the latest news with coverImageUrl
        const headNewsItem = newsItems.find(news => news.coverImageUrl) || newsItems[0];
        setHeadNews(headNewsItem);
      } catch (error) {
        console.error('Error fetching head news:', error);
      }
    };

    fetchHeadNews();
  }, []);

  return (
    <div className="app">
      <NavBar1 />
      <NavBar2 />
      
      <main>
        <div className="banner-userpts">
          <div className="left-panel">
            <HeadNewsCard news={headNews} />
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {/* Ads and Sponsored Content */}
          <GoogleAd1
            client="ca-pub-xxxxxxxxxxxxxxx"
            slot="1234567890"
            async
          />
          <SponsoredBanner1 
            imageSrc="https://example.com/sponsor-banner.jpg"
            altText="Sponsored Ad"
            link="https://example.com"
          />
          
          {/* Main Content */}
          <FeaturedContent />
          <NewsArticles />
          <Videos />
          <Section1/>
          <VideoSection/>

          <NewsSection 
            title="Politics" 
            categoryId={1} 
            navigationPath="/राजनीति"
          />

          <NewsSection 
            title="Crime" 
            categoryId={3} 
            navigationPath="/अपराध"
          />

          <SponsoredBanner1 
            imageSrc="https://example.com/sponsor-banner.jpg"
            altText="Sponsored Ad"
            link="https://example.com"
          />

          <NewsSection 
            title="Sports" 
            categoryId={9} 
            navigationPath="/खेल"
          />

          <NewsSection 
            title="Entertainment" 
            categoryId={10} 
            navigationPath="/मनोरंजन"
          />

          <SponsoredBanner1 
            imageSrc="https://example.com/sponsor-banner.jpg"
            altText="Sponsored Ad"
            link="https://example.com"
          />

          <NewsSection 
            title="National" 
            categoryId={4} 
            navigationPath="/राष्ट्रीय"
          />

          <NewsSection 
            title="International" 
            categoryId={5} 
            navigationPath="/अंतरराष्ट्रीय"
          />

          <WhatsAppButton/>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default LandingPage;
