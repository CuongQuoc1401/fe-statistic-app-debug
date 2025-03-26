import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // **LƯU Ý QUAN TRỌNG:**
        // Trong ứng dụng thực tế, bạn sẽ gọi API backend ở đây để xác thực người dùng.
        // Chúng ta sẽ mô phỏng đăng nhập thành công ở đây cho mục đích demo.
        if (email === 'a@gmail.com' && password === '1111') {
            setIsLoggedIn(true);
            setUser({ email }); // Lưu thông tin người dùng (tùy chọn)
            return true; // Đăng nhập thành công
        } else {
            return false; // Đăng nhập thất bại
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};