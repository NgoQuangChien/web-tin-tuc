
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đăng nhập ở đây
    }
    return(
        <div className='loginContainer'>
            <div className='closeForm'></div>
            <form className='loginForm' onSubmit={handleSubmit}>
                <h2 className='loginTitel'>Đăng nhập</h2>
                <div className='loginInput'>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" value={"Đăng nhập"} />
                </div>
            </form>
        </div>
    );
}