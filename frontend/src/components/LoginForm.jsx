
import { useState } from 'react';
import '../index.css'
import '../style/auth.css'


export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng nhập ở đây
    }
    return(
            <form className='authForm' onSubmit={handleLoginSubmit}>
                <div className='closeForm'>x</div>
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

                    <input type="submit" className='inputSubmit inputItem' value={"Login"} />

                    <p>Don't have an account yet? <a className = 'authNow' href="#">Sign up now</a></p>
                </div>
            </form>
    );
}