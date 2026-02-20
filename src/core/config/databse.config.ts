export default (): any => ({
  DATABASE_URL:
    process.env.NODE_ENV === 'test'
      ? (process.env.TEST_DATABASE_URL as string)
      : (process.env.DATABASE_URL as string),
});
