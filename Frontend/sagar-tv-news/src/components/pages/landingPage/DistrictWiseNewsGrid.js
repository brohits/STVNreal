import React from "react";
import DistrictWiseNewsCard from "./DistrictWiseNewsCard";
import "./DistrictWiseNewsGrid.css";

const newsData = [
  {
    title: "मामले बढ़ने पर पीएम मोदी आज उच्च स्तरीय बैठक करेंगे",
    author: "Abhishek Sharma",
    date: "Nov 25, 2024 21:27 IST",
    image: "path/to/image1.jpg",
  },
  {
    title: "आप ने मनाया पार्टी स्थापना दिवस",
    author: "Abhishek Sharma",
    date: "Nov 25, 2024 21:27 IST",
    image: "path/to/image2.jpg",
  },
  // Add more objects here
];

const DistrictWiseNewsGrid = () => {
  return (
    <div className="district-wise-news-grid">
      {newsData.map((news, index) => (
        <DistrictWiseNewsCard key={index} news={news} />
      ))}
    </div>
  );
};

export default DistrictWiseNewsGrid;
