// components/NewsItem.jsx
import React from "react";
import "../style/newsItem.css";

const NewsItem = ({ news, onView }) => {
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

// Helper function hiển thị tên danh mục đẹp
const getCategoryName = (category) => {
  const categories = {
    "xa-hoi": "Xã Hội",
    "chinh-tri": "Chính Trị",
    "giao-duc": "Giáo Dục",
    "cong-nghe": "Công Nghệ",
    "kinh-te": "Kinh Tế",
    "the-thao": "Thể Thao",
  };
  return categories[category] || category;
};

export default NewsItem;
