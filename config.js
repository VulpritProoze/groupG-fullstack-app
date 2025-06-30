module.exports = {
    database: {
        url: process.env.DB_URL,
        ssl: process.env.DB_SSL,
    },
    secret: process.env.SECRET,
    emailFrom: process.env.EMAIL_FROM,
    smtpOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
}