import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Email hoặc mật khẩu không đúng.');
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
                    <button type="submit" className={styles.button}>Login Now</button>
                    <div className={styles.login_signup}>
                        Don't have an account? <a href="#" id="signup">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;