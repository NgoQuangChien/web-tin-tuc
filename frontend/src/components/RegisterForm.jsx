import { useState } from 'react';
import '../index.css'
import '../style/auth.css'


export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng ký ở đây
    }

    return(
        <form className='authForm' onSubmit={handleRegisterSubmit}>
            <div className='closeForm'>x</div>
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

                <input type="submit" className='inputSubmit inputItem' value={"Register"} />

                <p>Already have an account? <a className = 'authNow' href="#">Sign in now</a></p>
            </div>
        </form>
    );
}