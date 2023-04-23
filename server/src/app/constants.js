module.exports = {
    // Thoi gian het han cua access token la 1h (1000ms * 60s * 60m)
    EXPIRE_TIME_ACCESS_TOKEN: 1000 * 60 * 60,
    // Thoi gian het han cua refresh token la 7d (1000ms * 60s * 60m * 24h * 7d)
    EXPIRE_TIME_REFRESH_TOKEN: 1000 * 60 * 60 * 24 * 7,
};
