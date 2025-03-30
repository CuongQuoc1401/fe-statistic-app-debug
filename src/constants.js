// constants.js

function getUTCDateFormatted() {
  const now = new Date(); // Lấy thời gian hiện tại theo múi giờ của người dùng

  // Lấy offset múi giờ của người dùng (số phút lệch so với UTC)
  const userOffset = now.getTimezoneOffset();

  // Tạo một Date object mới biểu diễn thời điểm UTC
  // Bằng cách trừ đi offset (đổi dấu vì getTimezoneOffset trả về giá trị ngược)
  const utcNow = new Date(now.getTime() + userOffset * 60 * 1000);

  const year = utcNow.getFullYear();
  const month = String(utcNow.getMonth() + 1).padStart(2, '0');
  const day = String(utcNow.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}