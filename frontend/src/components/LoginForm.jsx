
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../index.css'
import '../style/auth.css'


export default function LoginForm({onClose, onSwitchToRegister, onLoginSuccess}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    async function handleLoginSubmit(e) {
        e.preventDefault();
        // Xử lý đăng nhập ở đây
        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
        const res = await axios.post("/auth/login", { username, password });

        const userData = {
            _id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            admin: res.data.admin,
        };
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        onLoginSuccess(userData);

        onClose();
        // Chuyển hướng theo quyền
        if (userData.admin) {
            navigate("/quan-ly-tin-tuc");
        } else {
            navigate("/");
        }

        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Đăng nhập thất bại");
        }
    }
    return(
        <div className='authContainer'>
            <form className='authForm' onSubmit={handleLoginSubmit}>
                <div className='closeForm' onClick={onClose}>x</div>
                <h1 className='authTitel'>Login</h1>
                <div className='authInput'>
                    <input
                        className='inputItem'
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        className='inputItem'
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <a className='forgotPass' href="#">Forgot password?</a>

                    <input type="submit" className='inputSubmit inputItem' value="Login" />

                    <p>Don't have an account yet? <span className = 'authNow' onClick={onSwitchToRegister}>Sign up now</span></p>

                    {error && <p className="errorMessage">{error}</p>}
                </div>
            </form>
        </div>
            
    );
}