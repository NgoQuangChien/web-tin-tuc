
import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000/v1",

    // Cho phép gửi cookie và thông tin xác thực cùng với các yêu cầu
    withCredentials: true,

    // Thiết lập mặc định dữ liệu gửi đi dưới dạng JSON
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;