const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    jwtSecret: JWTSECRET,
    contractURI: 'https://mumbai.polygonscan.com/token/0x3e233989bf4374ff639a74d94d4e0e17f5e40b07'
    // mongodburi: 'mongodb://localhost:27071'
};