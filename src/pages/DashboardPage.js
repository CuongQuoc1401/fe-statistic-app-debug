import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

import styles from './DashboardPage.module.css'; // Import CSS Module

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

const names = ['Best Sellers', 'Function A', 'Function B'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

function DashboardPage() {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Lấy hàm logout từ context

    useEffect(() => {
        const storedToken =
            localStorage.getItem('token') ||
            document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (storedToken) {
            setToken(storedToken);
        }
        console.log('DashboardPage rendered, token:', storedToken);
    }, []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
        setIsSelectOpen(false);
    };

    const handleOpen = () => {
        setIsSelectOpen(true);
    };

    const handleSearch = async () => {
        console.log('handleSearch called, token:', token, 'personName:', personName);
        setLoading(true);
        setError(null);

        try {
            let url =
                'https://bigdata-project-a8w0.onrender.com/best_sellers/multiple?names=';
            url += personName.join(',');

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResults(response.data);
        } catch (error) {
            setError(error.message || 'Failed to fetch data.');
        } finally {
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
                        multiple
                        displayEmpty
                        open={isSelectOpen}
                        onOpen={handleOpen}
                        onClose={() => setIsSelectOpen(false)}
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Select</em>;
                            }
                            return selected.join(', ');
                        }}
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
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSearch} disabled={loading || !token}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            {results.length > 0 && (
                <div className="resultsContainer">
                    <h2>Search Results</h2>
                    <ul>
                        {results.map((item, index) => (
                            <li key={index}>
                                {item.name} - Quantity Sold: {item.quantity_sold.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;