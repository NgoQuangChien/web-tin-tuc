import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {FaHouse,FaLandmark,FaPeopleRoof,FaGraduationCap,FaChartLine,FaGlobe,FaBasketball,FaBars,FaXmark,FaMagnifyingGlass,FaRightToBracket,FaRightFromBracket,FaRegNewspaper,FaUserGear,} from "react-icons/fa6";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import "../../style/header.css";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formType, setFormType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Lỗi parse user:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // Điều hướng sang trang kết quả tìm kiếm
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmed) return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // quay về trang chủ
  };


  // Danh sách menu với đường dẫn
  const menuItems = [
    { path: "/", icon: FaHouse, label: "Trang chủ" },
    { path: "/xa-hoi", icon: FaPeopleRoof, label: "Xã hội" },
    { path: "/chinh-tri", icon: FaLandmark, label: "Chính trị" },
    { path: "/giao-duc", icon: FaGraduationCap, label: "Giáo dục" },
    { path: "/cong-nghe", icon: FaGlobe, label: "Công nghệ" },
    { path: "/kinh-te", icon: FaChartLine, label: "Kinh tế" },
    { path: "/the-thao", icon: FaBasketball, label: "Thể thao" },
  ];

  // Menu quản lý cho admin
  const adminMenuItems = [
    { path: "/quan-ly-tin-tuc", icon: FaRegNewspaper, label: "Quản lý tin tức" },
    { path: "/quan-ly-nguoi-dung", icon: FaUserGear, label: "Quản lý người dùng" },
  ];

  return (
    <header className="headerContainer">
      {/* Sidebar menu */}
      <div className={`sidebarContainer ${isSidebarOpen ? "active" : ""}`}>
        <div className="menuGroup">
          <button className="closeSidebar" onClick={closeSidebar}>
            <FaXmark className="iconItem" />
          </button>

          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `menuItem ${isActive ? "active" : ""}`
                }
                onClick={closeSidebar}
              >
                <IconComponent className="iconItem" />
                {item.label}
              </NavLink>
            );
          })}

          {/*Nếu là admin thì hiển thị thêm mục quản lý */}
          {user && user.admin && (
            <div className="adminSection menuGroup">
              {adminMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `menuItem ${isActive ? "active" : ""}` // thêm lớp active nếu đang ở trang đó
                    }
                    onClick={closeSidebar}
                  >
                    <IconComponent className="iconItem" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          )}

          {/*Khu vực đăng nhập / đăng xuất */}
          <div className="authSection menuGroup">
            {!user ? (
              <div>
                <div
                  className="menuItem"
                  onClick={() => {
                    setFormType("login");
                    closeSidebar();
                  }}
                >
                  {" "}
                  <FaRightToBracket className="iconItem" />
                  Đăng nhập
                </div>
              </div>
            ) : (
              <div className="user">
                <span className="userName">
                  Hi, <b>{user.username}</b>
                </span>
                <div
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                >
                  <FaRightFromBracket className="iconItem iconLogout" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className="searchGroup">
        {/* Thanh tìm kiếm */}
        <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm tin tức..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <FaMagnifyingGlass className="iconItem" />
        </button>
      </form>

        {/* AuthSection cho desktop */}
        <div className="authSection desktopOnly">
          {!user ? (
            <div
              className="menuItem"
              onClick={() => {
                setFormType("login");
                closeSidebar();
              }}
            >
              <FaRightToBracket className="iconItem" />
              Đăng nhập
            </div>
          ) : (
            <div className="user">
              <span className="userName">
                Hi, <b>{user.username}</b>
              </span>
              <div
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
              >
                <FaRightFromBracket className="iconItem iconLogout" />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Nút mở sidebar */}
      <button className="openSidebar" onClick={toggleSidebar}>
        <FaBars className="iconItem" />
      </button>

      {/*Popup Login / Register */}
      {formType === "login" && (
        <LoginForm
          onClose={() => setFormType(null)}
          onSwitchToRegister={() => setFormType("register")}
          onLoginSuccess={(user) => {
            setUser(user);
            setFormType(null);
          }}
        />
      )}

      {formType === "register" && (
        <RegisterForm
          onClose={() => setFormType(null)}
          onSwitchToLogin={() => setFormType("login")}
        />
      )}
    </header>
  );
}
