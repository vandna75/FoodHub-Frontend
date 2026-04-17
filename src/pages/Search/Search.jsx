import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaCamera } from "react-icons/fa";
import axios from "axios";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Fetch text search results
  const fetchResults = async (q) => {
    if (!q.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://foodhub-backend-wptp.onrender.com/api/search?q=${encodeURIComponent(q)}`
      );
      setResults(res.data.foods || []);
      setOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Enter & Arrow keys
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && results[highlightIndex]) {
        handleSelect(results[highlightIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
      } else if (query.trim()) {
        navigate(`/search/${encodeURIComponent(query)}`);
      }
    }
  };

  // 🔹 Handle selecting a result
  const handleSelect = (food) => {
    setQuery(food.name);
    setOpen(false);
    setTimeout(() => {
      navigate(`/search/${encodeURIComponent(food.name)}`);
    }, 50);
  };

  // 🔹 Handle text search submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  // 🔹 Handle image search upload
  const handleImageSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post("https://foodhub-backend-wptp.onrender.com/api/search/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResults(res.data.foods || []);
      setOpen(true);

      // optional: auto-navigate to search results page
      navigate(`/search/${encodeURIComponent(res.data.query || "image")}`);
    } catch (err) {
      console.error("Image search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-lock-wrapper" ref={wrapperRef}>
      <form className="search-lock" onSubmit={handleSubmit}>
        <div className="search-center">
          <input
            type="text"
            className="search-input"
            placeholder="Search for dishes, restaurants and more..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchResults(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setOpen(true)}
          />

          <label htmlFor="img-upload" className="camera-btn" title="Search by image">
            <FaCamera />
          </label>
          <input
            id="img-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageSearch}
          />
        </div>

        <button type="submit" className="search-btn" aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {open && (
        <div className="search-dropdown">
          {loading ? (
            <div className="dropdown-row">Searching...</div>
          ) : results.length === 0 ? (
            <div className="dropdown-row">No results found</div>
          ) : (
            results.map((food, index) => (
              <div
                key={food._id}
                className={`dropdown-row ${index === highlightIndex ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/search/${encodeURIComponent(food.name)}`);
                  setOpen(false);
                }}              >
                {food.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


export default Search;
