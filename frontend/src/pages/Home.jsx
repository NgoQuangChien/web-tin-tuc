
import '../style/home.css';
export default function Home() {

    const newsItems = [
        {
        id: 1,
        title: "Fonseca - 'Djokovic mới' được kỳ vọng cản bước Alcaraz và Sinner",
        category: "Thể thao",
        time: "18 phút trước",
        size: "large",
        content: "Joao Fonseca, tay vợt mà Novak Djokovic muốn dẫn dắt sau khi giải nghệ, vừa giành danh hiệu lớn nhất từ đầu sự nghiệp tại Basel hôm..."
        },
        {
        id: 2,
        title: "Cầu thủ U23 Việt Nam bị đuổi vì đánh nguội ở V-League",
        category: "Bóng đá",
        time: "25 phút trước",
        size: "medium",
        content: "HÀ NỘI – Lê Văn Đô nhận thẻ đỏ sớm nhưng Công an Hà Nội vẫn vượt khó để thắng Công an TP HCM 1-0 tại vòng 8 V-League 2025-2026, tối 27/10."
        },
        {
        id: 3,
        title: "Neville: 'Chức vô địch nằm trong tay Arsenal'",
        category: "Bóng đá",
        time: "30 phút trước",
        size: "small"
        },
        {
        id: 4,
        title: "Nam Định suýt phải đưa thủ môn lên đá tiền đạo ở V-League",
        category: "Bóng đá",
        time: "35 phút trước",
        size: "medium",
        content: "NAM ĐỊNH - Nhờ pha làm bàn ở phút 89 của Lucas, ĐKVD Nam Định mới có thể hoà Đà Nẵng 1-1 trong bối cảnh không hoàn cảnh về nhân sự và tâm lý ở vòng 8 V-League 2025-2026, tối 27/10."
        },
        {
        id: 5,
        title: "Hàng thủ Arsenal có đang mạnh nhất mọi thời?",
        category: "Bóng đá",
        time: "40 phút trước",
        size: "small"
        },
        {
        id: 6,
        title: "Tay vợt nữ số sáu thế giới bỏ SEA Games 33 vì bất mãn",
        category: "Thể thao",
        time: "45 phút trước",
        size: "small"
        },
        {
        id: 7,
        title: "Vinicius doạ rời Real khi bị thay ra ở El Clasico",
        category: "Bóng đá",
        time: "50 phút trước",
        size: "small"
        }
    ];
    return (
                <div>
                    <h1 className="page-title">Tin tức nổi bật</h1>
                    <div className="news-grid">
                        {newsItems.map(item => (
                        <div 
                            key={item.id} 
                            className={`news-item ${item.size}`}
                        >
                            <div className="news-image">
                            <span>Hình ảnh</span>
                            </div>
                            <div className="news-content">
                            <div className="news-category">{item.category}</div>
                            <h3 className="news-title">{item.title}</h3>
                            {item.content && <p className="news-excerpt">{item.content}</p>}
                            <div className="news-meta">
                                <span className="news-time">{item.time}</span>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
    );
}
