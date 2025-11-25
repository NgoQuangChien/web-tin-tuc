import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { publicRoutes, privateRoutes } from './routes/routes.jsx'
import PrivateRoute from './routes/privateRoutes.jsx'
import MainLayout from './components/Layout/MainLayout.jsx'
import ManageLayout from './components/Layout/ManageLayout.jsx'

function App() {


  return (
    <Router>
        <div className='App'>
            <Routes>
              {publicRoutes.map((route, index) => { // map qua tất cả các route công khai
                const Layout = MainLayout // sử dụng MainLayout cho các trang công khai
                const Page = route.component
                return (
                  <Route key={index} path = {route.path} element = {<Layout><Page/></Layout>}/> // tạo route với layout và component tương ứng
                )
              })}       


              {/* Private routes */}
              {privateRoutes.map((route, index) => {
                const Layout = ManageLayout;
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute> // bảo vệ route riêng tư
                        <Layout>
                          <Page />
                        </Layout>
                      </PrivateRoute>
                    }
                  />
                );
              })}   
            </Routes>
        </div>
    </Router>
  )
}

export default App
