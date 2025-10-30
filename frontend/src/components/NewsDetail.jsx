import React from "react";

function NewsDetail({ show, onClose, news }) {
    if (!show || !news) return null;

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
            <p>{news.content}</p>
          </div>
          <div className="detail-meta">
            <p>
              <strong>Tác giả:</strong> {news.author}
            </p>
            <p>
              <strong>Ngày đăng:</strong> {news.date}
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