// import React from "react";
// import MainNewsCard from "./MainNewsCard";
// import "./CardGrid.css";

// const CardGrid = () => {
//   const cardsData = [
//     {
//       title: "शिवराज ने किया चुनावी हंगामा",
//       description:
//         "यह एक लंबा स्थापित तथ्य है कि जब एक पाठक एक पृष्ठ के खांचे को देखेगा...",
//       imageUrl: "https://example.com/image1.jpg",
//       author: "Abhishek Sharma",
//       date: "Nov 25, 2024 21:27 IST",
//     },
//     {
//       title: "रेप वाल्लाह के कबूल में धमाका, बरिस विश्वसिंग मैन",
//       description: "यह एक लंबे समय से स्थापित सत्य है कि ...",
//       imageUrl: "https://example.com/image2.jpg",
//       author: "Abhishek Sharma",
//       date: "Nov 25, 2024 21:27 IST",
//     },
//     {
//       title: "गजवा ए हिंद पर भगवान ए हिंद, जो होगा दो जाए...",
//       description: "यह एक लंबे समय से स्थापित सत्य है कि ...",
//       imageUrl: "https://example.com/image3.jpg",
//       author: "Abhishek Sharma",
//       date: "Nov 25, 2024 21:27 IST",
//     },
//     {
//       title: "सांची के स्तूप, मध्य प्रदेश के राजस्व चिन्ह के सांची में",
//       description: "यह एक लंबे समय से स्थापित सत्य है कि ...",
//       imageUrl: "https://example.com/image4.jpg",
//       author: "Abhishek Sharma",
//       date: "Nov 25, 2024 21:27 IST",
//     },
//     {
//       title: "शिवराज ने किया चुनावी हंगामा",
//       description: "यह एक लंबे समय से स्थापित सत्य है कि ...",
//       imageUrl: "https://example.com/image5.jpg",
//       author: "Abhishek Sharma",
//       date: "Nov 25, 2024 21:27 IST",
//     },
//   ];

//   return (
//     <div className="card-grid">
//       {/* Large Card */}
//       <div className="large-card">
//         <MainNewsCard
//           title={cardsData[0].title}
//           description={cardsData[0].description}
//           imageUrl={cardsData[0].imageUrl}
//           author={cardsData[0].author}
//           date={cardsData[0].date}
//         />
//       </div>

//       {/* Small Cards in 2x2 Grid */}
//       <div className="small-cards">
//         {cardsData.slice(1).map((card, index) => (
//           <MainNewsCard
//             key={index}
//             title={card.title}
//             description={card.description}
//             imageUrl={card.imageUrl}
//             author={card.author}
//             date={card.date}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CardGrid;
