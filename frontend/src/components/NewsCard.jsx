

const NewsCard = ({ news, onView, onEdit, onDelete }) => {
  return (
    <div className="news-card">
      {/* --- Ảnh tin tức --- */}
      {news.image?.url && (
        <div className="news-image">
          <img
            src={news.image.url}
            alt={news.image.alt || "Ảnh tin tức"}
            className="news-thumbnail"
          />
        </div>
      )}

      {/* --- Nội dung tin tức --- */}
      <div className="news-content">
        <h3 className="news-title">{news.title}</h3>
        
        <p className="news-preview">
          {news.content?.length > 100
            ? `${news.content.substring(0, 100)}...`
            : news.content}
        </p>

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
          Xem
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
