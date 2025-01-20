import React from "react";
import "./whatsapp.css"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Or replace with Font Awesome if needed

const WhatsAppButton = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/your-group-invite-link"; // Replace with your link

  return (
    <a href={whatsappGroupLink} target="_blank" rel="noopener noreferrer">
      <button className="whatsapp-button">
        <WhatsAppIcon className="icon" /> हमारे व्हाट्सएप ग्रुप से जुड़े
      </button>
    </a>
  );
};

export default WhatsAppButton;

