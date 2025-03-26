import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import styles from './DashboardPage.module.css';

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

const searchOptions = [
    'Best Seller',
    'Option B',
    'Option C',
    'Option D',
    'Option E',
];

function DashboardPage({ onLogout }) {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = React.useState(''); // Chỉ một state cho một lựa chọn
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setIsSelectOpen(false); // Đóng dropdown sau khi chọn
    };

    const handleSearchClick = () => {
        console.log('Searching for:', selectedOption);
        // Thêm logic tìm kiếm ở đây với selectedOption
    };

    const handleOpenSelect = () => {
        setIsSelectOpen(true);
    };

    const handleCloseSelect = () => {
        setIsSelectOpen(false);
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
                            <Button variant="outlined" color="secondary" onClick={onLogout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={styles.content}> {/* Container cho nội dung giữa */}
                <div className={styles.searchSection}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select
                            displayEmpty
                            open={isSelectOpen}
                            onOpen={handleOpenSelect}
                            onClose={handleCloseSelect}
                            value={selectedOption} // Sử dụng selectedOption
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => (
                                selected ? selected : <em>Select an option</em>
                            )}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="">
                                <em>Select an option</em>
                            </MenuItem>
                            {searchOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleSearchClick} sx={{ mt: 1 }}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;