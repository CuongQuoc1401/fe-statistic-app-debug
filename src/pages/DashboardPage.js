import React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
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

const searchOptions = [
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Option E',
];

function getStyles(name, selectedOptions, theme) {
    return {
        fontWeight:
            selectedOptions.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
    };
}

function DashboardPage({ onLogout }) {
    const theme = useTheme();
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [isSelectOpen, setIsSelectOpen] = React.useState(false); // State để kiểm soát việc mở dropdown

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSearchClick = () => {
        console.log('Searching for:', selectedOptions);
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
                    <div className={styles.nav_left}>
                        <h1>Product</h1>
                    </div>
                    <ul className={styles.nav_right}>
                        <li>
                            <Button variant="outlined" color="secondary" onClick={onLogout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={styles.searchSection}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <Select
                        multiple
                        displayEmpty
                        open={isSelectOpen} // Kiểm soát trạng thái mở
                        onOpen={handleOpenSelect}
                        onClose={handleCloseSelect}
                        value={selectedOptions}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => (
                            selected.length === 0 ? <em>Select options</em> : selected.join(', ')
                        )}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Select options</em>
                        </MenuItem>
                        {searchOptions.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                style={getStyles(option, selectedOptions, theme)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSearchClick} sx={{ mt: 1 }}>
                    Search
                </Button>
            </div>
            {/* Các phần khác của dashboard */}
        </div>
    );
}

export default DashboardPage;