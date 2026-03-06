export default (): any => ({
  GOOGLE_OAUTH: {
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    CALL_BACK_URL: process.env.CALL_BACK_URL as string,
  },
});
