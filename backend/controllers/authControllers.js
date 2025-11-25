const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const authControllers = {
    // REGISTER USER
    registerUser: async(req, res) => {
        try{
            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            if(!req.body.username || !req.body.email || !req.body.password){
                return res.status(400).json("Vui lòng điền đầy đủ thông tin!");
            }
            
            if(req.body.username.length < 6){
                return res.status(400).json("Tên đăng nhập phải có ít nhất 6 ký tự!");
            }

            if(req.body.password.length < 8){
                return res.status(400).json("Mật khẩu phải có ít nhất 8 ký tự!");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json("Email không hợp lệ!");
            }

            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json("Email đã tồn tại!");
            }

            const userExist = await User.findOne({ username });
            if (userExist) {
                return res.status(400).json("Username đã tồn tại!");
            }

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
            console.error(err); // Log ra server để debug
            return res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
        }
    },

    // Generate JWT Token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_SECRET,
        {expiresIn: "365d"},
        );
    },
    // LOGIN USER
    loginUser: async(req, res) => {
        try{

            if(!req.body.username || !req.body.password){
                return res.status(400).json("Vui lòng điền đầy đủ thông tin!");
            }

            const user = await User.findOne({username: req.body.username});
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!user || !validPassword){
                return res.status(400).json("Tên đăng nhập hoặc mật khẩu không đúng!");
            }

            if(user && validPassword){
                const accessToken = authControllers.generateAccessToken(user);
                const {password, ...others} = user._doc;
                res.status(200).json({...others,accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
    },

}

module.exports = authControllers;