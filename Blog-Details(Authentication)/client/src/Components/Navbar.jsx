import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3030";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/user/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setUser(null);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out.");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        backgroundColor:"darkblue",
        borderRadius: "0 0 12px 12px",
      }}
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "#fff", fontSize: "1.6rem", letterSpacing: "1px" }}
        >
          <span style={{ color: "#ffd700" }}>Blog</span>ify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link fw-semibold"
                style={{
                  color: "#fff",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/createpost"
                className="nav-link fw-semibold"
                style={{
                  color: "#fff",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Create Blog
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item text-white d-flex align-items-center">
                  <span className="me-2 fw-semibold">
                    👋 Welcome <strong>{user.name}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm"
                    style={{
                      background:
                        "linear-gradient(90deg, #ff6a00, #ee0979)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-sm"
                    style={{
                      background:
                        "linear-gradient(90deg, #00c6ff, #0072ff)",
                      color: "#fff",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-sm ms-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #f7971e, #ffd200)",
                      color: "#fff",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
