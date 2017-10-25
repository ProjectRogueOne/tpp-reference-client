const stringify = (val) => {
  if (val) {
    return `"${val}"`;
  } else {
    return 'null';
  }
};

module.exports = {
  NODE_ENV: '"production"',
  API_BASE_URL: stringify(process.env.API_BASE_URL),
  REDIRECT_DELAY_SECONDS: process.env.REDIRECT_DELAY_SECONDS,
}
