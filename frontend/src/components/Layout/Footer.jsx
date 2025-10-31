

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../../style/footer.css"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">NewsHub</h3>
                    <p className="footer-description">
                        Cung cấp những tin tức mới nhất, nhanh nhất và chính xác nhất 
                        về mọi lĩnh vực trong cuộc sống.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link">
                            <FaFacebook />
                        </a>
                        <a href="#" className="social-link">
                            <FaTwitter />
                        </a>
                        <a href="#" className="social-link">
                            <FaInstagram />
                        </a>
                        <a href="#" className="social-link">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Phần liên kết nhanh */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Liên kết nhanh</h4>
                    <ul className="footer-links">
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/xa-hoi">Xã hội</a></li>
                        <li><a href="/chinh-tri">Chính trị</a></li>
                        <li><a href="/giao-duc">Giáo dục</a></li>
                        <li><a href="/cong-nghe">Công nghệ</a></li>
                        <li><a href="/kinh-te">Kinh tế</a></li>
                        <li><a href="/the-thao">Thể thao</a></li>
                    </ul>
                </div>

                {/* Phần thông tin liên hệ */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Liên hệ</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <span>18 P. Viên, Bắc Từ Liêm, Hà Nội</span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>+84 0399999999</span>
                        </div>
                        <div className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <span>contact@newshub.com</span>
                        </div>
                    </div>
                </div>

                {/* Phần newsletter */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Đăng ký nhận tin</h4>
                    <p className="newsletter-description">
                        Nhận thông báo khi có tin tức mới nhất
                    </p>
                </div>
            </div>

            {/* Phần copyright */}
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    
                    <div className="footer-bottom-links">
                        <a href="/privacy">Chính sách bảo mật</a>
                        <a href="/terms">Điều khoản sử dụng</a>
                        <a href="/about">Về chúng tôi</a>
                    </div>
                    <p>&copy; 2025 NewsHub</p>
                </div>
            </div>
        </footer>
    );
}