const User = require('../models/User');
const bcrypt = require('bcryptjs');


const authControllers = {
    // REGISTER USER
    registerUser: async(req, res) => {
        try{
            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            
            // Tạo người dùng mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            // Lưu người dùng vào DB
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }catch(err){
            res.status(500).json("Người dùng đã tồn tại!");
        }
    },

    // LOGIN USER
    loginUser: async(req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("Sai tên đăng nhập!");
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(400).json("Sai mật khẩu!");
            }

            if(user && validPassword){
                res.status(200).json(user);
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
}

module.exports = authControllers;