import { useState } from 'react';
import {FaHouse, FaLandmark, FaPeopleRoof, FaGraduationCap, FaChartLine, FaGlobe, FaBasketball, FaBars, FaXmark, FaMagnifyingGlass } from 'react-icons/fa6';
import '../style/header.css';

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

        function toggleSidebar() {
            setIsSidebarOpen(!isSidebarOpen);
        }

        function closeSidebar() {
            setIsSidebarOpen(false);
        }
    
    return(
        <header className='headerContainer'>
        
            {/* Logo */}
            <div className='logo'>Logo</div>

            {/* Sidebar */}
            <div className={`sidebarContainer ${isSidebarOpen ? "active" : ""}`}>

                <div className='menuGroup'>
                    <div><FaHouse className='iconItem'/>Trang chủ</div>
                    <div><FaPeopleRoof className='iconItem'/>Xã hội</div>
                    <div><FaLandmark className='iconItem'/>Chính trị</div>
                    <div><FaGraduationCap className='iconItem'/>Giáo dục</div>
                    <div><FaGlobe className='iconItem'/>Công nghệ</div>
                    <div><FaChartLine className='iconItem'/>Kinh tế</div>
                    <div><FaBasketball className='iconItem'/>Thể thao</div>

                    <button className="closeSidebar" onClick={closeSidebar}>
                    <FaXmark className='iconItem'/>
                    </button>
                </div>

                {/* Thanh tìm kiếm (luôn hiển thị) */}
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <button>
                        <FaMagnifyingGlass className='iconItem'/>
                    </button>
                </div>

                {/* Nút mở sidebar (chỉ hiện trên mobile) */}
                <button className="openSidebar" onClick={toggleSidebar}>
                    <FaBars className='iconItem'/>
                </button>
                {/* Overlay */}
                {isSidebarOpen && <div id="overlay" onClick={closeSidebar}></div>}
            </div>
        </header>
    );
}