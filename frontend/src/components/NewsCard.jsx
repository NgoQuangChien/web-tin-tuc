import React from "react";

const NewsCard = ({ news, onView, onEdit, onDelete }) => {
  return (
    <div className="news-card">
      {/* --- Nội dung tin tức --- */}
      <div className="news-content">
        <h3 className="news-title">{news.title}</h3>
        
        {/* Hiển thị phần mô tả ngắn (giới hạn 100 ký tự) */}
        <p className="news-preview">
          {news.content?.length > 100
            ? `${news.content.substring(0, 100)}...`
            : news.content}
        </p>

        {/* Thông tin tác giả và ngày đăng */}
        <div className="news-meta">
          <span className="author">
            Tác giả: {news.author?.username || "Không rõ"}
          </span>
          <span className="date">
            Ngày: {new Date(news.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>

      {/* --- Các nút thao tác --- */}
      <div className="news-actions">
        <button className="btn btn-view" onClick={() => onView(news)}>
          Xem chi tiết
        </button>

        <button className="btn btn-edit" onClick={() => onEdit(news)}>
          Sửa
        </button>

        <button className="btn btn-delete" onClick={() => onDelete(news._id)}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
