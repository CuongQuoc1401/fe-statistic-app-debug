import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import backgroundImage from '../assets/website-forms-bg.jpg';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className={styles.home} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <a href="/" className={styles.nav_logo}>TranQuocCuong</a>
                    <ul className={styles.nav_items}>
                        <li className={styles.nav_item}>
                            <a href="#" className={styles.nav_link}>Home</a>
                            <a href="#" className={styles.nav_link}>Product</a>
                            <a href="#" className={styles.nav_link}>Services</a>
                            <a href="#" className={styles.nav_link}>Contact</a>
                        </li>
                    </ul>
                    <button className={styles.button} onClick={handleLoginClick}>Login</button>
                </nav>
            </header>
        </div>
    );
};

export default HomePage;