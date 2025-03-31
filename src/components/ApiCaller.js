// import React, { useEffect } from 'react';
// import axios from 'axios'; // Hoặc thư viện HTTP client bạn đang dùng

// function ApiCaller() {
//   const apiUrl = 'https://bigdata-project-a8w0.onrender.com/read_root'; // Đảm bảo URL chính xác

//   const callApi = async () => {
//     try {
//       await axios.get(apiUrl);
//       console.log('API read_root called successfully at:', new Date().toLocaleTimeString());
//       // Bạn có thể thêm logic khác ở đây nếu cần sau khi gọi API thành công
//     } catch (error) {
//       console.error('Error calling API read_root:', error.message);
//       // Bạn có thể thêm logic xử lý lỗi khác ở đây
//     }
//   };

//   useEffect(() => {
//     // Gọi API lần đầu khi component mount (tùy chọn)
//     callApi();

//     // Thiết lập interval để gọi API mỗi 25 phút (25 * 60 * 1000 milliseconds)
//     const intervalId = setInterval(callApi, 14 * 60 * 1000);

//     // Cleanup function để clear interval khi component unmount
//     return () => clearInterval(intervalId);
//   }, []); // [] dependency array đảm bảo useEffect chỉ chạy một lần

//   // Component này không cần hiển thị gì trên giao diện nếu bạn chỉ muốn gọi API ngầm
//   return null;
// }

// export default ApiCaller;