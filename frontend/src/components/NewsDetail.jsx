import React from "react";
import "../style/newsDetail.css"

// Component hiển thị chi tiết tin tức

function NewsDetail({ show, onClose, news }) {
  // Nếu không được yêu cầu hiển thị hoặc không có dữ liệu news -> không render gì cả
    if (!show || !news) return null;

    // Hàm xử lý xuống dòng cho nội dung
    const formatContent = (content) => {
        if (!content) return '';
        // Thay thế các ký tự xuống dòng bằng thẻ <br />
        return content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < content.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Chi tiết tin tức</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h3 className="detail-title">{news.title}</h3>

          <div className="detail-content">
            {news.image?.url && (
              <div className="detail-image">
                <img
                  src={news.image.url}
                  alt={news.image.alt || "Ảnh tin tức"}
                  className="news-thumbnail"
                />
              </div>
            )}
            <div className="news-content-text">
              {formatContent(news.content)}
            </div>
          </div>
          <div className="detail-meta">
            <p>
              <strong>Ngày đăng:</strong> {new Date(news.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-close" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
     );
}

export default NewsDetail;