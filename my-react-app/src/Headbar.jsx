import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Headbar.css";
import projectlogo from "./assets/logo_text.png";
import searchicon from "./assets/search_icon.png"
function Headbar({ isLoggedIn, userName, setUserName, setIsLoggedIn, userData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setUserName("Guest");
    setIsLoggedIn(false);
    closeDropdown();
    navigate("/login");
  };

  const handleProfileRedirect = () => {
    closeDropdown();
    if (userData?.email) {
      navigate(`/profile/${userData.email}`);
    }
  };

  return (
    <div className="navbar">
      <img src={projectlogo} alt="Project Logo" className="logo" />

      <ul className={`lists ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/launch" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Launch
          </NavLink>
        </li>
        <li>
          <NavLink to="/investor" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Investor
          </NavLink>
        </li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={searchicon} alt="Search Icon" className="logo" />
      </div>

      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {dropdownOpen && (
        <div className="dropdown-div">
          {isLoggedIn ? (
            <div className="content">
              <h3>Welcome!</h3>
              <button onClick={handleProfileRedirect} className="profile-btn">
                View Profile
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="content">
              <h3>Welcome, Guest!</h3>
              <button onClick={() => navigate("/login")} className="logout-btn">
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Headbar;
