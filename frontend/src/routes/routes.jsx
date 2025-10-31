import Home from '../pages/Home';
import XaHoi from '../pages/XaHoi';
import ChinhTri from '../pages/ChinhTri';
import GiaoDuc from '../pages/GiaoDuc';
import CongNghe from '../pages/CongNghe';
import KinhTe from '../pages/KinhTe';
import TheThao from '../pages/TheThao';
import Search from '../pages/Search';
import NewsManagement from '../pages/NewsManagement';
import UserManagement from '../pages/UserManagement';


// Public routes
const publicRoutes = [
    {path: '/', component: Home, layout: 'MainLayout'},
    {path: '/xa-hoi', component: XaHoi, layout: 'MainLayout'},
    {path: '/chinh-tri', component: ChinhTri, layout: 'MainLayout'},
    {path: '/giao-duc', component: GiaoDuc, layout: 'MainLayout'},
    {path: '/cong-nghe', component: CongNghe, layout: 'MainLayout'},
    {path: '/kinh-te', component: KinhTe, layout: 'MainLayout'},
    {path: '/the-thao', component: TheThao, layout: 'MainLayout'},
    {path: '/search', component : Search, layout: 'MainLayout'},
];

const privateRoutes = [
    {path: '/quan-ly-tin-tuc', component: NewsManagement, layout: 'ManageLayout'},
    {path: '/quan-ly-nguoi-dung', component: UserManagement, layout: 'ManageLayout'},
];

export { publicRoutes, privateRoutes };