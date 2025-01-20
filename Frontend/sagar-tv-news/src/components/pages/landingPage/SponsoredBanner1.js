import React from "react";

const SponsoredBanner1 = ({ imageSrc, altText, link }) => {
  return (
    <div className="sponsored-banner">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={imageSrc} alt={altText} style={{ width: "100%", height: "auto" }} />
      </a>
    </div>
  );
};

export default SponsoredBanner1;
