import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";
import { useName } from "./context/NameContext";

const getTimeAgo = (dateString) => {
  const now = new Date();
  const createdDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  const weeks = Math.floor(diffInSeconds / (7 * 24 * 60 * 60));
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  return "Just now";
};

const HomePage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search?tags=story&page=${page}&hitsPerPage=20`
        );
        setData(response.data.hits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);
  const { name } = useName();

  const handleCardClick = (item) => {
    navigate("/comments", { state: { comments: item.children || [] } });
  };

  const filteredData = data.filter((item) => {
    const titleMatch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = item.author
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const urlMatch = item.url
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch || urlMatch;
  });

  return (
    <div className="center">
      <div className="navbar">
        <div className="logo">
          <img
            src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
            alt="algolia"
          />
          <h2>{name}</h2>
        </div>
        <div className="search-input">
          <span className="material-icons">search</span>
          <input
            type="text"
            placeholder="Search stories by title, url or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="home-page common-bg">
        {filteredData.map((item) => (
          <div
            key={item.objectID}
            className="card"
            onClick={() => handleCardClick(item)}
            style={{ cursor: "pointer" }}
          >
            <p className="title">
              {item.title}{" "}
              <a href={item.url} target="_blank" rel="noreferrer">
                ( {item.url} )
              </a>
            </p>
            <p className="grey">
              {item.points} points | {item.author} |{" "}
              {getTimeAgo(item.created_at)} | {item.num_comments} comments
            </p>
          </div>
        ))}
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
