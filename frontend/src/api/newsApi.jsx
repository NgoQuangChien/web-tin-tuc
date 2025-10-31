import instance from './axios';


// GET tất cả tin tức
export const getNews = (queryParams = '') => instance.get(`/news/allnews${queryParams}`);

// POST tạo tin tức
export const createNews = (news) => instance.post('/news/createnews', news);

// GET chi tiết tin tức
export const getNewsById = (id) => instance.get(`/news/${id}/getnewsbyid`);

// PUT cập nhật tin tức
export const updateNews = (id, news) => instance.put(`/news/${id}/updatenews`, news);

// DELETE tin tức
export const deleteNews = (id) => instance.delete(`/news/${id}/deletenews`);

// GET tin tức theo category
