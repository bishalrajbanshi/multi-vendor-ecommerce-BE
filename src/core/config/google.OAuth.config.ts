export default (): any => ({
  GOOGLE_OAUTH: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    CALL_BACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  },
});
