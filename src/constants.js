// constants.js

// Offset của Hàn Quốc so với UTC (tính bằng mili giây)
export const getKoreaTimeNow = () => {
    const now = new Date();
    const koreaOffset = 9 * 60 * 60 * 1000; // Offset của Hàn Quốc so với UTC (9 tiếng)
    const localOffset = now.getTimezoneOffset() * 60 * 1000; // Offset của múi giờ hiện tại so với UTC
    const koreaTime = new Date(now.getTime() + localOffset + koreaOffset);
    return koreaTime;
  };

// Tên múi giờ IANA cho Hàn Quốc (sử dụng cho Intl.DateTimeFormat)
export const KOREA_IANA_TIMEZONE = 'Asia/Seoul';

// (Bạn có thể thêm các hằng số khác liên quan đến thời gian hoặc ứng dụng tại đây)