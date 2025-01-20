import React from "react";
import "./DistrictWiseNewsHeader.css";

const DistrictWiseNewsHeader = () => {
  return (
    <div className="district-wise-news-header-container">
        <h1 className="district-wise-news-title">District Wise News</h1>
        <div className="gradient-underline"></div>
      <div className="district-wise-news-header">
        <div className="district-wise-news-nav">
          <span className="district-tab">सागर</span>
          <span className="district-tab">इंदौर</span>
          <span className="district-tab">उज्जैन</span>
          <span className="district-tab">ग्वालियर</span>
          <span className="district-tab">चंबल</span>
          <span className="district-tab">जबलपुर</span>
        </div>
        <input
          type="text"
          placeholder="Search news..."
          className="district-wise-news-search-bar"
        />
      </div>
    </div>
  );
};

export default DistrictWiseNewsHeader;
