import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";


const SearchResult = () => {
  const { query } = useParams(); // URL se query milegi (ex: /search/salad)
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://foodhub-backend-wptp.onrender.com/api/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.foods || []);
      } catch (err) {
        console.error("Search result error:", err);
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-result-page">
      <h2 className="search-title">
        Results for "<span>{query}</span>"
      </h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : results.length === 0 ? (
        <p className="no-results">No results found for "{query}"</p>
      ) : (
        <div className="results-grid">
          {results.map((item) => (
            <div
              className="food-card"
              key={item._id}
              onClick={() => navigate(`/food/${item._id}`)}
            >

              <img
                src={`https://foodhub-backend-wptp.onrender.com/images/${item.image}`}
                alt={item.name}
                className="food-img"
              />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p className="category">{item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
