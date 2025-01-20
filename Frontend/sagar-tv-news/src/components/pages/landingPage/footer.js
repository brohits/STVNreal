import React from "react";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import StvnLogo from "../../../assets/STVN logo 1.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-main">
        {/* Company Info Section */}
        <div className="footer-section company-info">
          <div className="footer-logo">
            <img src={StvnLogo} alt="STVN India Logo" className="footer-logo-image" />
          </div>
          <p className="company-description">
            आपका विश्वसनीय समाचार स्रोत, जो देश और दुनिया की ताज़ा खबरें, विश्लेषण और विशेष रिपोर्ट प्रदान करता है।
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <HiLocationMarker className="contact-icon" />
              <span>बीड़ी हॉस्पिटल के सामने, संजय ड्राइव रोड, बाघराज वार्ड, सागर (म.प्र.)</span>
            </div>
            <div className="contact-item">
              <BsTelephone className="contact-icon" />
              <span>8269544444</span>
              <span> 9074626262</span>
            </div>
            <div className="contact-item">
              <IoMdMail className="contact-icon" />
              <span>hr@sagartvnews.com</span>
              <span>sagartvnews@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section quick-links">
          <h3>त्वरित लिंक</h3>
          <ul>
            <li><a href="/about">हमारे बारे में</a></li>
            <li><a href="/contact">संपर्क करें</a></li>
            <li><a href="/careers">करियर</a></li>
            <li><a href="/advertise">विज्ञापन</a></li>
            <li><a href="/privacy-policy">गोपनीयता नीति</a></li>
            <li><a href="/terms">नियम और शर्तें</a></li>
          </ul>
        </div>

        {/* News Categories Section */}
        <div className="footer-section categories">
          <h3>समाचार श्रेणियां</h3>
          <ul>
            <li><a href="/राजनीति">राजनीति</a></li>
            <li><a href="/अपराध">अपराध</a></li>
            <li><a href="/खेल">खेल</a></li>
            <li><a href="/मनोरंजन">मनोरंजन</a></li>
            <li><a href="/राष्ट्रीय">राष्ट्रीय</a></li>
            <li><a href="/अंतरराष्ट्रीय">अंतरराष्ट्रीय</a></li>
          </ul>
        </div>

        {/* Cities Section */}
        <div className="footer-section cities">
          <h3>प्रमुख शहर</h3>
          <ul>
            <li><a href="/location/sagar">सागर</a></li>
            <li><a href="/location/ujjain">उज्जैन</a></li>
            <li><a href="/location/indore">इंदौर</a></li>
            <li><a href="/location/gwalior">ग्वालियर</a></li>
            <li><a href="/location/jabalpur">जबलपुर</a></li>
            <li><a href="/location/chambal">चंबल</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h3>न्यूज़लेटर सब्सक्राइब करें</h3>
          <p>ताज़ा खबरों के लिए हमारे न्यूज़लेटर की सदस्यता लें</p>
          <div className="newsletter-form">
            <input type="email" placeholder="अपना ईमेल दर्ज करें" />
            <button type="submit">सब्सक्राइब</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            {currentYear} STVN India. सर्वाधिकार सुरक्षित.
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
