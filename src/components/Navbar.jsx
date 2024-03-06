import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchUser } from "../features/UserDetailsSlice";
import { Parallax } from "react-parallax";
import "../App.css";
import jungle from "../images/new world.png";
import ace from "../images/portgasace.png";
const Navbar = () => {
  const [searchData, setSearchData] = useState("");
  const location = useLocation();
  const allUsers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [dispatch, searchData]);

  return (
    <div className="App">
      <Parallax
        className="parallax-container"
        bgImage={location.pathname === "/read" ? jungle : ace}
        strength={-200}
        blur={{ min: -15, max: 15 }}
      >
        <div className="content">
          <div className="text-content">
            CRUD APP
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h4 className="navbar-brand">RTK</h4>

                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        Create Post
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/read" className="nav-link">
                        All Post ({allUsers.length})
                      </Link>
                    </li>
                  </ul>
                  <input
                    className="form-control me-2 w-50"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Navbar;
