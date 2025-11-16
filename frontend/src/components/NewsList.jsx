// Hiển thị danh sách tin tức
import { useState, useEffect } from 'react';
import { getNews} from '../api/newsApi';
import NewsItem from './NewsItem'; 
import NewsDetail from './NewsDetail'; // Import NewsDetail component
import "../style/newsList.css";

const NewsList = ({ category = '' }) => {
  // State lưu danh sách các tin
  const [news, setNews] = useState([]);
  // State lưu trạng thái dữ liệu
  const [loading, setLoading] = useState(true);
  // State lưu thông báo lỗi
  const [error, setError] = useState('');
  // State cho biết tin nào đang được chọn để xem chi tiết
  const [selectedNews, setSelectedNews] = useState(null);
  // State điều khiển modal chi tiết tin có đang hiển thị không
  const [showDetail, setShowDetail] = useState(false);

  // Gọi hàm fetchNews() để tải lại danh sách tin khi category thay đổi
  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      
      let response;
      // Nếu có category thì thêm query string vào URL
      if (category && category !== 'all') {
        // Ví dụ: /v1/news?category=xa-hoi
        response = await getNews(`?category=${category}`);
      } else {
        response = await getNews();
      }
      
      // Dữ liệu trả về
      const newsData = response.data.news || response.data;
      // Cập nhật lại State news
      setNews(newsData);

    } catch (err) {
      // Hiển thị lỗi trong quá trình fetch API 
      console.error('Error fetching news:', err);
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi click "Xem chi tiết"
  const handleView = (newsItem) => {
    // Lưu tin được chọn
    setSelectedNews(newsItem);
    // Hiển thị chi tiết tin
    setShowDetail(true);
  };

  // Hàm đóng modal
  const handleCloseDetail = () => {
    // Ẩn chi tiết tin và xóa trạng thái với tin được chọn
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
        <p>{error}</p>
        {/*Nút gọi lại hàm fetchNews()*/}
        <button onClick={fetchNews} className="btn-retry">
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="news-list-container">
      <h1 className="news-list-title">{getCategoryTitle(category)}</h1>
      
      {news.length === 0 ? (
        <div className="news-list-empty">
          <p>Chưa có tin tức nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="news-list-grid">
          {news.map(item => (
            <NewsItem 
              key={item._id} 
              news={item}
              onView={handleView} // Truyền hàm sử lý sự kiện xem chi tiết
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

// Hàm chuyển category thành tiêu đề
const getCategoryTitle = (category) => {
  const categories = {
    'xa-hoi': 'Tin Xã Hội',
    'chinh-tri': 'Tin Chính Trị', 
    'giao-duc': 'Tin Giáo Dục',
    'cong-nghe': 'Tin Công Nghệ',
    'kinh-te': 'Tin Kinh Tế',
    'the-thao': 'Tin Thể Thao',
    'all': 'Tin Tức',
    '': 'Tin Tức Nổi Bật'
  };
  return categories[category] || 'Tin Tức';
};

export default NewsList;