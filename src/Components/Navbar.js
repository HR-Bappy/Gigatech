import React, { useState } from "react";
import "../assets/css/Navbar.css";
import menu from "../assets/images/icons/menu.webp";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  let history = useHistory()
  const [showNav, setshowNav] = useState(false);
  function tooglenav() {
    setshowNav(!showNav);
  }
  function Logout(){
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <div className="nav-header">
      <div className="nav-bar">
        <div className="row">
          <div className="col-2 menu-icon">
            <span
              onClick={() => {
                tooglenav();
              }}
            >
              <img src={menu} alt="menu bar"></img>
            </span>
          </div>
          <div className="col-2 logo">
            <div className="">
              <Link to="/" className="nav-link">
              Github Trending
              </Link>
            </div>
          </div>

          <div className="col-10">
            <div className="row">
              <ul className="menu">
                <li className="menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/top-user-by-country" className="nav-link">
                  Top user by country
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/top-repositories" className="nav-link">
                  Top repositories
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/data-visualization" className="nav-link">
                  Data visualization
                  </Link>
                </li>

                {
                  localStorage.getItem('token')?
                  <li className="menu-item">
                  <a href="" onClick={Logout} className="nav-link">
                    Logout
                  </a>
                </li>
                :
                  <li className="menu-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                }
              </ul>
            </div>
          </div>
        </div>
        {showNav ? (
          <div className="">
            <ul className="mobile-menu">
              <li className="mobile-menu-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    tooglenav();
                  }}
                >
                  Home
                </Link>
              </li>

              <li className="mobile-menu-item">
                <Link
                  to="/about_us"
                  className="nav-link"
                  onClick={() => {
                    tooglenav();
                  }}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
