// components/AddNewsForm.jsx
import React from 'react';
import "../style/addNews.css"

const AddNewsForm = ({ show, onClose, news, setNews, onSubmit, selectedNews }) => {
  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNews(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setNews(prev => ({
      ...prev,
      image: {
        ...prev.image,
        [name]: value
      }
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{selectedNews ? "Sửa tin tức" : "Thêm tin tức mới"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Tiêu đề *</label>
            <input
              type="text"
              name="title"
              placeholder="Nhập tiêu đề (10-100 ký tự)"
              value={news.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Mô tả *</label>
            <textarea
              name="description"
              placeholder="Nhập mô tả ngắn (10-200 ký tự)"
              value={news.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Nội dung *</label>
            <textarea
              name="content"
              placeholder="Nhập nội dung chi tiết (ít nhất 50 ký tự)"
              value={news.content}
              onChange={handleInputChange}
              rows="6"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>URL Hình ảnh *</label>
              <input
                type="text"
                name="url"
                placeholder="https://example.com/image.jpg"
                value={news.image.url}
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label>Mô tả hình ảnh *</label>
              <input
                type="text"
                name="alt"
                placeholder="Mô tả cho hình ảnh"
                value={news.image.alt}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Danh mục *</label>
              <select
                name="category"
                value={news.category}
                onChange={handleInputChange}
              >
                <option value="chinh-tri">Chính trị</option>
                <option value="kinh-te">Kinh tế</option>
                <option value="cong-nghe">Công nghệ</option>
                <option value="xa-hoi">Xã hội</option>
                <option value="giao-duc">Giáo dục</option>
                <option value="the-thao">Thể thao</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phạm vi *</label>
              <select
                name="scope"
                value={news.scope}
                onChange={handleInputChange}
              >
                <option value="trong-nuoc">Trong nước</option>
                <option value="quoc-te">Quốc tế</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-submit" onClick={onSubmit}>
            {selectedNews ? "Cập nhật" : "Thêm tin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewsForm;