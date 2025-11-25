import Home from '../pages/Home';
import XaHoi from '../pages/XaHoi';
import ChinhTri from '../pages/ChinhTri';
import GiaoDuc from '../pages/GiaoDuc';
import CongNghe from '../pages/CongNghe';
import KinhTe from '../pages/KinhTe';
import TheThao from '../pages/TheThao';
import Search from '../pages/Search';


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


export { publicRoutes };