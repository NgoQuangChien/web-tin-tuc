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

    excerpt: {
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
        required: true
    }

},
    ({ timestamps: true})
);

module.exports = mongoose.model('news', newsSchema);