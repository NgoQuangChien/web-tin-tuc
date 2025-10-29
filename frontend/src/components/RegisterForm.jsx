import { useState } from 'react';
import axios from '../api/axios';
import '../index.css'
import '../style/auth.css'


export default function RegisterForm({onClose, onSwitchToLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleRegisterSubmit(e) {
        e.preventDefault();
        // Xử lý đăng ký ở đây
        if (!username || !email || !password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
        const res = await axios.post("/auth/register", {
            username,
            email,
            password
        });

        setSuccess("Đăng ký thành công! Hãy đăng nhập ngay.");
        setError(null);

        //Sau 1.5s thì tự chuyển sang login form
        setTimeout(() => {
            onSwitchToLogin();
        }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Đăng ký thất bại");
            setSuccess(null);
        }
    }

    return(
        <div className="authContainer">
            <form className='authForm' onSubmit={handleRegisterSubmit}>
                <div className='closeForm' onClick={onClose}>x</div>
                <h1 className='authTitle'>Register</h1>
                <div className='authInput'>
                    <input 
                        className='inputItem'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

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

                    <input type="submit" className='inputSubmit inputItem' value="Register" />

                    <p>Already have an account? <span className = 'authNow' onClick={onSwitchToLogin}>Sign in now</span></p>

                    {error && <p className="errorMessage">{error}</p>}
                    {success && <p className="successMessage">{success}</p>}
                </div>
            </form>
        </div>
        
    );
}