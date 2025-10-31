const express = require('express');
const router = express.Router();

const newsControllers = require('../controllers/newsControllers');

router.get('/allnews',newsControllers.getNews );
router.get('/search', newsControllers.searchNews)
router.post('/createnews', newsControllers.createNews);
router.get('/:id/getnewsbyid',newsControllers.getNewsById);
router.put('/:id/updatenews', newsControllers.updateNews);
router.delete('/:id/deletenews', newsControllers.deleteNews);


module.exports = router;