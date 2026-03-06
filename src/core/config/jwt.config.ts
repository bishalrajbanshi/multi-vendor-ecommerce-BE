export default () => ({
  JWT: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    ACCESS_EXPIRATION_TIME: process.env.ACCESS_EXPIRATION_TIME as string,
  },
  REFRESH_JWT: {
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    REFRESH_EXPIRATION_TIME: process.env.REFRESH_EXPIRATION_TIME as string,
  },
});
