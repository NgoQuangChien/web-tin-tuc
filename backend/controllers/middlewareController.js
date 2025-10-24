const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
                if(err){
                     res.status(403).json("Token không hợp lệ!");
                }
                req.user = user;
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