// components/NewsList.jsx
import { useState, useEffect } from 'react';
import { getNews} from '../api/newsApi';
import NewsItem from './NewsItem'; 
import NewsDetail from './NewsDetail'; // Import NewsDetail component
import "../style/newsList.css";

const NewsList = ({ category = '' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNews, setSelectedNews] = useState(null); // State cho tin được chọn
  const [showDetail, setShowDetail] = useState(false); // State hiển thị modal

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      
      let response;
      
      if (category && category !== 'all') {
        response = await getNews(`?category=${category}`);
      } else {
        response = await getNews();
      }
      
      const newsData = response.data.news || response.data;
      setNews(newsData);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi click "Xem chi tiết"
  const handleView = (newsItem) => {
    console.log('Xem chi tiết tin:', newsItem);
    setSelectedNews(newsItem);
    setShowDetail(true);
  };

  // Hàm đóng modal
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedNews(null);
  };

  if (loading) {
    return (
      <div className="news-list-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải tin tức...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-list-error">
        <p>❌ {error}</p>
        <button onClick={fetchNews} className="btn-retry">
          🔄 Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="news-list-container">
      <h1 className="news-list-title">{getCategoryTitle(category)}</h1>
      
      {news.length === 0 ? (
        <div className="news-list-empty">
          <p>📝 Chưa có tin tức nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="news-list-grid">
          {news.map(item => (
            <NewsItem 
              key={item._id} 
              news={item}
              onView={handleView} // Truyền hàm handleView xuống NewsItem
            />
          ))}
        </div>
      )}

      {/* NewsDetail Modal */}
      <NewsDetail 
        show={showDetail}
        onClose={handleCloseDetail}
        news={selectedNews}
      />
    </div>
  );
};

const getCategoryTitle = (category) => {
  const categories = {
    'xa-hoi': 'Tin Xã Hội',
    'chinh-tri': 'Tin Chính Trị', 
    'giao-duc': 'Tin Giáo Dục',
    'cong-nghe': 'Tin Công Nghệ',
    'kinh-te': 'Tin Kinh Tế',
    'the-thao': 'Tin Thể Thao',
    'all': 'Tất Cả Tin Tức',
    '': 'Tin Tức Nổi Bật'
  };
  return categories[category] || 'Tin Tức';
};

export default NewsList;