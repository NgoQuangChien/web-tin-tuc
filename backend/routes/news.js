const express = require('express');
const middleware = require('../controllers/middlewareController');
const router = express.Router();

const newsControllers = require('../controllers/newsControllers');

router.get('/allnews',newsControllers.getNews ); // Lấy tất cả tin tức
router.get('/search', newsControllers.searchNews); // Tìm kiếm tin tức theo từ khóa
router.post('/createnews',middleware.verifyTokenAndAdminAuth, newsControllers.createNews); // Tạo tin tức mới
router.get('/:id/getnewsbyid',middleware.verifyTokenAndAdminAuth, newsControllers.getNewsById); // Lấy tin tức theo ID
router.put('/:id/updatenews',middleware.verifyTokenAndAdminAuth, newsControllers.updateNews); // Cập nhật tin tức theo ID
router.delete('/:id/deletenews',middleware.verifyTokenAndAdminAuth, newsControllers.deleteNews); // Xóa tin tức theo ID


module.exports = router;