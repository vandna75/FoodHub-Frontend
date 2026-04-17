import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");

  const {
    getTotalCartAmount,
    token,
    setToken,
    searchQuery,
    setSearchQuery,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        </li>

        <li>
          <Link to="/menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
        </li>

        <li>
          <Link to="/contact" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>contact us</Link>
        </li>
      </ul>

      <div className="navbar-right">

        {/* 🔍 SEARCH */}
        <div className="navbar-search">
          <div className="search-wrapper">

            {searchQuery && (
              <span
                className="clear-icon"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </span>
            )}

            <input
              type="text"
              placeholder="Search for dishes..."
              className="search-box"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);

                // 👇 YAHI SCROLL KA CODE
                document.getElementById("food-display")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />

          </div>
        </div>

        {/* 🛒 CART */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* 👤 AUTH */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

