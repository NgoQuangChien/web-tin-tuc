const express = require('express');
const router = express.Router();

const newsControllers = require('../controllers/newsControllers');

router.get('/allnews',newsControllers.getNews );
router.get('/:id/getnewsbyid',newsControllers.getNewsById);
router.post('/createnews', newsControllers.createNews);
router.put('/:id/updatenews', newsControllers.updateNews);
router.delete('/:id/deletenews', newsControllers.deleteNews);


module.exports = router;