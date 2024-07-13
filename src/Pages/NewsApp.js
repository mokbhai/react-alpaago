import React, { useState, useEffect } from "react";
import "./Styles/NewsPage.css";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState("en");

  const fetchNews = () => {
    fetch(
      `https://api.worldnewsapi.com/top-news?api-key=58569d9cfb104e1e910ec182393a104c&source-country=${country}&language=${language}`
    )
      .then((response) => response.json())
      .then((data) => setNews(data.top_news[0].news));
  };

  return (
    <div className="news-container">
      <h1>Top News Headlines</h1>
      <div className="input-container">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country code"
        />
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter language code"
        />
        <button onClick={fetchNews}>Fetch News</button>
      </div>
      {news.map((item, index) => (
        <div key={index} className="news-card">
          <img src={item.image} alt={item.title} className="news-image" />
          <div className="news-content">
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <p>Published on: {item.publish_date}</p>
            <p>Author: {item.author}</p>
            <a href={item.url} className="read-more">
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
