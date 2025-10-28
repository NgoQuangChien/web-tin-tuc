import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home.jsx'
import XaHoi from './pages/XaHoi.jsx'
import ChinhTri from './pages/ChinhTri.jsx'
import GiaoDuc from './pages/GiaoDuc.jsx'
import CongNghe from './pages/CongNghe.jsx'
import KinhTe from './pages/KinhTe.jsx'
import TheThao from './pages/TheThao.jsx'
import NewsManagement from './pages/NewsManagement.jsx'

function App() {


  return (
    <Router>
        <div className='App'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/xa-hoi" element={<XaHoi />} />
                <Route path="/chinh-tri" element={<ChinhTri />} />
                <Route path="/giao-duc" element={<GiaoDuc />} />
                <Route path="/cong-nghe" element={<CongNghe />} />
                <Route path="/kinh-te" element={<KinhTe />} />
                <Route path="/the-thao" element={<TheThao />} />
                <Route path='/news-management' element={<NewsManagement />} />
            </Routes>
        </div>
    </Router>
  )
}

export default App
