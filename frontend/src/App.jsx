import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import { publicRoutes, privateRoutes } from './routes/routes.jsx'
import MainLayout from './components/Layout/MainLayout.jsx'

function App() {


  return (
    <Router>
        <div className='App'>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = MainLayout
                const Page = route.component
                return (
                  <Route key={index} path = {route.path} element = {<Layout><Page/></Layout>}/>
                )
              })}          
            </Routes>
        </div>
    </Router>
  )
}

export default App
