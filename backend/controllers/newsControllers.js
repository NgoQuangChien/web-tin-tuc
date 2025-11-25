const News = require('../models/News');

//  Get all news
//  GET /api/news
const getNews = async (req, res) => {
  try {
    const { category, scope} = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by scope
    if (scope && scope !== 'all') {
      query.scope = scope;
    }
    
    const news = await News.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
    
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/news/:id

const getNewsById = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!news) {
      return res.status(404).json({ message: 'Tin tức không tồn tại' });
    }
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  POST /api/news

const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Tiêu đề tin tức đã tồn tại' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
};


// PUT /api/news/:id

const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ message: 'Tin tức không tồn tại' });
    }
    
    res.json(news);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Tiêu đề tin tức đã tồn tại' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
};

//DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'Tin tức không tồn tại' });
    }
    
    res.json({ message: 'Đã xóa tin tức thành công', deletedNews: news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tìm kiếm tin tức theo từ khóa
const searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(200).json({ 
        success: true,
        data: [],
        message: "Vui lòng nhập từ khóa tìm kiếm" 
      });
    }

    const phrase = q.trim();

    // Sử dụng regex để tìm kiếm chính xác hơn
    const news = await News.find({
      $or: [
        { title: { $regex: phrase, $options: 'i' } },
        { content: { $regex: phrase, $options: 'i' } }
      ]
    })
    .populate("author", "username fullName")
    .sort({ createdAt: -1 }) // Sắp xếp mới nhất trước
    .limit(50);

    res.status(200).json({
      success: true,
      data: news,
      count: news.length,
      message: `Tìm thấy ${news.length} kết quả`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Lỗi server khi tìm kiếm"
    });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  searchNews
};