const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token; // Lấy token từ header (Thường sử dụng Bearer <token>)
        if(token){
            const accessToken = token.split(" ")[1]; // Tách "Bearer " khỏi token
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
                if(err){
                     res.status(403).json("Token không hợp lệ!");
                }
                req.user = user; // Lưu thông tin user từ token vào req.user để sử dụng sau này
                next();
             });
        }
        else{
            return res.status(401).json("Bạn chưa đăng nhập!");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.admin){
                next();
            }
            else{
                res.status(403).json("Bạn không có quyền truy cập!");
            }
        });
    },
}

module.exports = middlewareController;