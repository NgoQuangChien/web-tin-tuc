import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchNews } from '../api/newsApi';
import NewsItem from "../components/NewsItem";
import NewsDetail from "../components/NewsDetail";
import "../style/search.css";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
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

        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setResults(res.data.data);
        } else {
          setResults([]);
          setError(res.data?.message);
        }
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
        setError(err.response?.data?.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Hàm xử lý khi click "Xem chi tiết"
  const handleView = (newsItem) => {
    // Lưu tin được chọn
    setSelectedNews(newsItem);
    // Hiển thị chi tiết tin
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedNews(null);
  };

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
            <div className="news-list-grid">
              {results.map((item) => (
                <NewsItem 
                    key={item._id} 
                    news={item} 
                    onView={handleView}
                />
              ))}
            </div>
          </div>
        ) : (
          query && <div className="no-results">Không tìm thấy kết quả nào.</div>
        )
      )}
            <NewsDetail
              show={showDetail}
              onClose={handleCloseDetail}
              news={selectedNews}
            />
    </div>
  );
}