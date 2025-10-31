import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchNews } from '../api/newsApi';
import NewsItem from "../components/NewsItem";
import "../style/search.css"; // Import CSS mới

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Lấy query từ URL (?q=abc)
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await searchNews(query);

        console.log("Dữ liệu trả về:", res.data);

        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setResults(res.data.data);
        } else {
          setResults([]);
          setError(res.data?.message || "Không có kết quả phù hợp");
        }
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
        setError(err.response?.data?.message || "Lỗi khi kết nối đến server");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="newsListContainer">
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>

      {/* Loading */}
      {loading && <div className="loading">Đang tìm kiếm...</div>}

      {/* Error */}
      {error && <div className="error">{error}</div>}

      {/* Kết quả */}
      {!loading && !error && (
        Array.isArray(results) && results.length > 0 ? (
          <div className="results-container">
            <p className="results-count">Tìm thấy {results.length} kết quả</p>
            <div className="search-results-grid">
              {results.map((item) => (
                <NewsItem key={item._id} news={item} />
              ))}
            </div>
          </div>
        ) : (
          query && <div className="no-results">Không tìm thấy kết quả nào.</div>
        )
      )}
    </div>
  );
}