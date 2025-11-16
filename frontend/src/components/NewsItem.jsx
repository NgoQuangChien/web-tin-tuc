// components/NewsItem.jsx
import React from "react";
import "../style/newsItem.css";

// Props:
// - news: object chứa dữ liệu bài viết (title, image, category, content, ...)
// - onView: function callback (tùy chọn) được gọi khi người dùng muốn xem chi tiết
const NewsItem = ({ news, onView }) => {
  // Hàm handler: kiểm tra onView tồn tại và là function trước khi gọi
  // Tránh lỗi khi parent không truyền prop này
  const handleView = () => {
    if (onView && typeof onView === "function") {
      onView(news);
    }
  };

  return (
    <div className="news-item">
      {/* Ảnh tin tức */}
      {news.image?.url && (
        <div className="news-item-image">
          <img
            src={news.image.url}
            alt={news.image.alt || "Ảnh tin tức"}
            className="news-item-thumbnail"
          />
        </div>
      )}

      {/* Nội dung tin tức */}
      <div className="news-item-content">
        <h4 className="news-item-title">{news.title}</h4>

        {/* Nút hành động */}
        <div className="news-item-actions">
          <button
            className="news-item-view-details"
            onClick={handleView}
            type="button"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
