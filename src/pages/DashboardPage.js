import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import styles from './DashboardPage.module.css';
import { getUTCDateFormatted } from '../constants'; // Điều chỉnh đường dẫn nếu cần

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = ['Best Sellers', 'Function A', 'Function B']; // Danh sách các tùy chọn

function getStyles(name, selectedOptions, theme) {
    return {
        fontWeight:
            selectedOptions === name
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
    };
}

function DashboardPage() {
    const theme = useTheme();
    const [selectedOptions, setSelectedOptions] = useState('');
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const storedToken =
            localStorage.getItem('token') ||
            document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
        setIsSelectOpen(false);
    };

    const handleOpen = () => {
        setIsSelectOpen(true);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setBestSellers([]); // Reset kết quả cũ

        if (selectedOptions === 'Best Sellers Of Shop') {
            try {
                const today = getUTCDateFormatted();
                // const today = new Date(); // Lấy thời gian hiện tại theo múi giờ của người dùng
                // const year = today.getFullYear();
                // const month = String(today.getMonth() + 1).padStart(2, '0');
                // const day = String(today.getDate()).padStart(2, '0');
                // const formattedDate = `${year}-${month}-${day}`; // Định dạng YYYY-MM-DD

                const url = `https://bigdata-project-a8w0.onrender.com/best_sellers/${today}`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBestSellers(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch best sellers.');
            } finally {
                setLoading(false);
            }
        } else if (selectedOptions === 'Best Sellers Yesterday') {
            setError('Chưa có API cho lựa chọn này.');
            setLoading(false);
        }else if (selectedOptions === 'Function A' || selectedOptions === 'Function B') {
            setError('Chưa có API cho lựa chọn này.');
            setLoading(false);
        } else {
            setError('Vui lòng chọn một tùy chọn.');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (logout) {
            logout();
        }
        navigate('/login');
    };

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.navLeft}>
                        <h1>Product</h1>
                    </div>
                    <ul className={styles.navRight}>
                        <li>
                            <Button variant="outlined" color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={styles.searchSection}>
                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                        displayEmpty
                        open={isSelectOpen}
                        onOpen={handleOpen}
                        onClose={() => setIsSelectOpen(false)}
                        value={selectedOptions}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => (selected ? selected : <em>Select</em>)}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Select</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, selectedOptions, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSearch} disabled={loading || !token} variant="contained" color="primary" sx={{ mt: 3 }}>
                    Search
                </Button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {loading && <p>Loading...</p>}
            {bestSellers.length > 0 && (
                <div className={styles.resultsContainer}>
                    <h2>Best Sellers for SamSungShop</h2>
                    <ul>
                        {bestSellers.map((item, index) => (
                            <li key={index}>
                                {item.name} - Quantity Sold: {item.quantity_sold}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;