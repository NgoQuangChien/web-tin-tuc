const News = require('../models/News');

//  Get all news
//  GET /api/news
const getNews = async (req, res) => {
  try {
    const {category} = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
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
      req.params.id, // Lấy ID từ tham số URL
      { $inc: { views: 1 } },
      { new: true } // Trả về tài liệu đã được cập nhật
    );
    
    if (!news) {
      return res.status(404).json({ message: 'Tin tức không tồn tại' }); // Tránh trả về null
    }
    
    res.json(news); // Trả về tin tức đã được cập nhật
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  POST /api/news

const createNews = async (req, res) => {
  try {
    const news = new News(req.body); // Tạo một tin mới từ dữ liệu trong req.body
    const savedNews = await news.save();
    res.status(201).json(savedNews); // Trả về tin đã được lưu với mã trạng thái 201
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PUT /api/news/:id

const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    
    if (!news) {
      return res.status(404).json({ message: 'Tin tức không tồn tại' });
    }
    
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id); // Xóa tin tức theo ID
    
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
    const { q } = req.query; // Lấy từ khóa tìm kiếm từ query parameters

    if (!q || q.trim() === '') { // Nếu từ khóa rỗng
      return res.status(200).json({ 
        success: true,
        data: [],
        message: "Vui lòng nhập từ khóa tìm kiếm" 
      });
    }

    const phrase = q.trim(); // Loại bỏ khoảng trắng thừa

    const news = await News.find({
      $or: [
        { title: { $regex: phrase, $options: 'i' } }, // Tìm trong tiêu đề
        { content: { $regex: phrase, $options: 'i' } }, // Tìm trong nội dung
        { description: { $regex: phrase, $options: 'i' } } // Tìm trong mô tả
      ]
    })
    .populate("author") // Lấy thông tin
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