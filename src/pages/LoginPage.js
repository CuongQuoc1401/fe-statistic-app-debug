import React from 'react';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css'; // Tạo file CSS cho LoginPage nếu cần

const LoginPage = () => {
    return (
        <div className={styles.loginPageContainer}> {/* Thêm container để style nếu cần */}
            <LoginForm />
        </div>
    );
};

export default LoginPage;