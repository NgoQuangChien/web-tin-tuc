import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHouse, FaBars, FaXmark, FaMagnifyingGlass, FaRegNewspaper, FaUserGear } from 'react-icons/fa6';

import '../../style/headerManage.css';

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm
        console.log('Search term:', searchTerm);
    };

    const menuItems = [
        { path: '/', icon: FaHouse, label: 'Trang chủ' },
        { path: '/quan-ly-tin-tuc', icon: FaRegNewspaper, label: 'Quản lý tin tức' },
        { path: '/quan-ly-nguoi-dung', icon: FaUserGear, label: 'Quản lý user' },
    ];

    return(
        <>
            {/* Sidebar menu bên trái */}
            <div className={`leftSidebar ${isSidebarOpen ? "sidebarOpen" : ""}`}>
                {/* Sidebar Header */}
                <div className='sidebarTop'>
                    <div className='sidebarLogo'>Admin Panel</div>
                    <button className="sidebarCloseBtn" onClick={toggleSidebar}>
                        <FaXmark className='sidebarIcon'/>
                    </button>
                </div>

                {/* Thanh tìm kiếm trong sidebar */}
                <div className="sidebarSearchBox">
                    <form onSubmit={handleSearch} className="searchForm">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            className="searchInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="searchButton">
                            <FaMagnifyingGlass className='sidebarIcon'/>
                        </button>
                    </form>
                </div>
                
                {/* Menu items */}
                <nav className='sidebarNav'>
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => 
                                    `navLink ${isActive ? 'navActive' : ''}`
                                }
                                onClick={closeSidebar}
                            >
                                <IconComponent className='navIcon'/>
                                <span className="navText">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* User info và logout */}
                <div className="sidebarBottom">
                    {user && (
                        <div className="userSection">
                            <div className="userWelcome">Xin chào, {user.name || user.email}</div>
                            <button className="logoutButton" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay cho mobile */}
            {isSidebarOpen && <div className="sidebarBackdrop" onClick={closeSidebar}></div>}

            {/* Nút mở sidebar (chỉ hiện khi sidebar đóng) */}
            {!isSidebarOpen && (
                <button className="sidebarToggle" onClick={toggleSidebar}>
                    <FaBars className='sidebarIcon'/>
                </button>
            )}
        </>
    );
}