import { useState, useEffect } from "react";
import "../style/newsManagement.css";
import AddNewsForm from "../components/AddNewsForm";
import { getNews, createNews, updateNews, deleteNews } from "../api/newsApi";
import NewsCard from "../components/NewsCard";

export default function NewsManagement() {
  // Danh sách tin tức
  const [news, setNews] = useState([]);

  // Quản lý modal (form thêm/sửa)
  const [showModal, setShowModal] = useState(false);

  // Modal xem chi tiết
  const [showDetail, setShowDetail] = useState(false);

  // Tin đang được chọn để sửa hoặc xem
  const [selectedNews, setSelectedNews] = useState(null);

  // Dữ liệu form thêm/sửa
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    description: "",
    image: { url: "", alt: "" },
    category: "xa-hoi",
    scope: "trong-nuoc"
  });

  //Lấy danh sách tin tức từ backend
  const fetchNews = async () => {
    try {
      const res = await getNews();
      setNews(res.data.news); // Backend trả về { news: [...] }
    } catch (error) {
      console.error("Lấy tin tức lỗi:", error);
    }
  };

  // Gọi fetchNews khi component load
  useEffect(() => {
    fetchNews();
  }, []);

  //Kiểm tra form hợp lệ
  const validateNews = () => {
    return (
      newNews.title && newNews.title.length >= 10 && newNews.title.length <= 100 &&
      newNews.content && newNews.content.length >= 50 &&
      newNews.description && newNews.description.length >= 10 && newNews.description.length <= 200 &&
      newNews.image.url && newNews.image.alt &&   // bắt buộc có ảnh
      newNews.category && newNews.scope
    );
  };

  // Reset form sau khi thêm/sửa
  const resetForm = () => {
    setNewNews({
      title: "",
      content: "",
      description: "",
      image: { url: "", alt: "" },
      category: "xa-hoi",
      scope: "trong-nuoc"
    });
    setSelectedNews(null);
  };

  //Lưu tin (thêm hoặc sửa)
  const handleSubmit = async () => {
    if (!validateNews()) {
      alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
      return;
    }

    try {
      if (selectedNews) {
        // Cập nhật tin hiện có
        await updateNews(selectedNews._id, newNews);
      } else {
        // Tạo tin mới
        await createNews(newNews);
      }

      await fetchNews(); // Refresh danh sách
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu tin tức:", error);
      alert("Không thể lưu tin tức. Kiểm tra console để xem chi tiết.");
    }
  };

  //Khi bấm “Sửa”
  const handleEdit = (item) => {
    setNewNews({
      title: item.title,
      content: item.content,
      description: item.description,
      image: {
        url: item.image?.url || "",
        alt: item.image?.alt || ""
      },
      category: item.category,
      scope: item.scope
    });
    setSelectedNews(item);
    setShowModal(true);
  };

  // Khi bấm “Xóa”
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin tức này?")) {
      try {
        await deleteNews(id);
        await fetchNews();
      } catch (error) {
        console.error("Xóa tin tức lỗi:", error);
      }
    }
  };

   const handleViewDetail = (newsItem) => {
    setSelectedNews(newsItem);
    setShowDetail(true);
  };

  return (
    <div className="containerNewsManage">
      {/* Header */}
      <header className="app-header">
        <h1>Quản lý Tin tức</h1>
      </header>

      {/* Thanh công cụ */}
      <div className="toolbar">
        <button className="btn-add" onClick={() => setShowModal(true)}>
          + Thêm tin tức mới
        </button>
      </div>

      {/* Danh sách tin tức */}
      <div className="news-list">
        {news.map((item) => (
          <NewsCard
            key={item._id}
            news={item}
            onView={handleViewDetail}    //thêm dòng này
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>

      {/* Modal thêm/sửa tin */}
      <AddNewsForm
        show={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        news={newNews}
        setNews={setNewNews}
        onSubmit={handleSubmit}
        selectedNews={selectedNews}
      />

    </div>
  );
}
