import dot from 'dotenv';
dot.config();

export default {
    dbName: 'MONGODB_USERNAME',
    dbPass: 'MONGODB_PASSWORD',

    accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
    accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
    refreshTokenPrivateKey: 'REFRESH_TOKEN_PRIVATE_KEY',
    refreshTokenPublicKey: 'REFRESH_TOKEN_PUBLIC_KEY',

    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_SECRET,
    googleOauthRedirect: process.env.OAUTH_REDIRECT,
};