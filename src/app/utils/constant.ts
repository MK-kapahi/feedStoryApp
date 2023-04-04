export const REGEX = {
    USERNAME: /[a-zA-Z0-9]{3,}/,
    EMAIL: /[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/,
    PASSWORD: /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    CPF:/\d{3}\.\d{3}\.\d{3}\-\d{2}/,
    YOUTUBE_LINK:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/,
    PHONE:/^[6-9]\\d{9}$/,
    DOMAIN:/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    ACCOUNT_NUMBER:/^[0-9]{9,18}$/
  };