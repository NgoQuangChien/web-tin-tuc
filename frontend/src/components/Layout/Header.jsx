import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHouse, FaLandmark, FaPeopleRoof, FaGraduationCap, FaChartLine, FaGlobe, FaBasketball, FaBars, FaXmark, FaMagnifyingGlass } from 'react-icons/fa6';
import '../../style/header.css';

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    // Danh sách menu với đường dẫn
    const menuItems = [
        { path: '/', icon: FaHouse, label: 'Trang chủ' },
        { path: '/xa-hoi', icon: FaPeopleRoof, label: 'Xã hội' },
        { path: '/chinh-tri', icon: FaLandmark, label: 'Chính trị' },
        { path: '/giao-duc', icon: FaGraduationCap, label: 'Giáo dục' },
        { path: '/cong-nghe', icon: FaGlobe, label: 'Công nghệ' },
        { path: '/kinh-te', icon: FaChartLine, label: 'Kinh tế' },
        { path: '/the-thao', icon: FaBasketball, label: 'Thể thao' }
    ];

    return(
        <header className='headerContainer'>
            {/* Logo */}
            <NavLink to="/" className='logo' onClick={closeSidebar}>Logo</NavLink>

            {/* Sidebar menu */}
            <div className={`sidebarContainer ${isSidebarOpen ? "active" : ""}`}>
                <div className='menuGroup'>
                    <button className="closeSidebar" onClick={closeSidebar}>
                        <FaXmark className='iconItem'/>
                    </button>
                    
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => 
                                    `menu-item ${isActive ? 'active' : ''}`
                                }
                                onClick={closeSidebar}
                            >
                                <IconComponent className='iconItem'/>
                                {item.label}
                            </NavLink>
                        );
                    })}
                    <div>
                        <button>Đăng nhập</button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

        

            {/* Thanh tìm kiếm */}
            <div className="search">
                <input type="text" placeholder="Search..." />
                <button>
                    <FaMagnifyingGlass className='iconItem'/>
                </button>
            </div>
            
            {/* Nút mở sidebar */}
            <button className="openSidebar" onClick={toggleSidebar}>
                <FaBars className='iconItem'/>
            </button>
        </header>
    );
}