const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 100
    },

    content: {
        type: String,
        required: true,
        minlength: 50
    },

    image: {
        url: {
            type: String,
            required: true,
        },

        alt: {
            type: String,
            required: true,
        }
    },

    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200,
        trim: true
    },

    category: {
        type: String,
        required: true,
        enum: ['chinh-tri','kinh-te','cong-nghe','xa-hoi','giao-duc','the-thao'],
        default: 'xa-hoi'
    },

    scope: {
        type: String,
        required: true,
        enum: ['trong-nuoc','quoc-te'],
        default: 'trong-nuoc'
    },

    viewCount: {
        type: Number,
        default: 0
    },

    publishedAt: {
        type: Date,
        default: Date.now()
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }

},
    ({ timestamps: true}) // Tự động tạo createdAt và updatedAt
);

newsSchema.index({ category: 1, createdAt: -1 }); // Tạo index cho category và createdAt để tối ưu truy vấn danh sách theo danh mục, 1 là tăng dần, -1 là giảm dần
newsSchema.index({ title: 'text', content: 'text' , description: 'text'}); // Tạo index text để tối ưu tìm kiếm

module.exports = mongoose.model('news', newsSchema);