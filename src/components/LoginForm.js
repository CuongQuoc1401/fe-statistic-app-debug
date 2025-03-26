import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styles from './LoginForm.module.css';
import axios from 'axios'; // Import axios

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); // Chúng ta có thể không cần context trực tiếp ở đây nữa
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Xóa lỗi trước đó

        try {
            const response = await axios.post(
                'https://bigdata-project-a8w0.onrender.com/login',
                {
                    username: email, // Sử dụng email làm username
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                const { access_token } = response.data;
                localStorage.setItem('token', access_token); // Lưu token vào localStorage
                // Gọi hàm login từ context nếu bạn vẫn muốn duy trì trạng thái auth qua context
                if (login) {
                    login(true); // Ví dụ: set isAuthenticated thành true trong context
                }
                navigate('/dashboard'); // Chuyển hướng đến dashboard
            } else {
                setError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            setError('Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.form_container}>
            <div className={`${styles.form} ${styles.login_form}`}>
                <i className={`uil uil-times ${styles.form_close}`} onClick={() => navigate('/')}></i>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className={styles.input_box}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className={`uil uil-envelope-alt ${styles.email}`}></i>
                    </div>
                    <div className={styles.input_box}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i className={`uil uil-lock ${styles.password}`}></i>
                        <i
                            className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} ${styles.pw_hide}`}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    <div className={styles.option_field}>
                        <span className={styles.checkbox}>
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </span>
                        <a href="#" className={styles.forgot_pw}>Forgot password?</a>
                    </div>
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Login Now'}
                    </button>
                    <div className={styles.login_signup}>
                        Don't have an account? <a href="#" id="signup">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;