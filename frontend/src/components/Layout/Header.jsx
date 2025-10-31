import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {FaHouse,FaLandmark,FaPeopleRoof,FaGraduationCap,FaChartLine,FaGlobe,FaBasketball,FaBars,
FaXmark,FaMagnifyingGlass,FaRightToBracket,FaRightFromBracket,FaRegNewspaper, FaUserGear} from "react-icons/fa6";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import "../../style/header.css";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [formType, setFormType] = useState(null);

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

  // 🔹 Xử lý đăng xuất
  const handleLogout = () => {
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
              <div
                className="menuItem"
                onClick={() => {
                  navigate("/quan-ly-tin-tuc");
                  closeSidebar();
                }}
              >
                <FaRegNewspaper className="iconItem"/>Quản lý tin tức
              </div>
              <div
                className="menuItem"
                onClick={() => {
                  navigate("/quan-ly-nguoi-dung");
                  closeSidebar();
                }}
              >
                <FaUserGear className="iconItem"/>Quản lý người dùng
              </div>
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

      {/* Thanh tìm kiếm */}
      <div className="search">
        <input type="text" placeholder="Search..." />
        <button>
          <FaMagnifyingGlass className="iconItem" />
        </button>
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
