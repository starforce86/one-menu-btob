// Move this out and put in ENV vars
exports.HOST = process.env.HOST;
exports.APP_PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.DB_TYPE = process.env.DB_TYPE;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_URL = process.env.DB_URL;
exports.DB_ENV = process.env.DB_ENV;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_USER = process.env.DB_USER;
exports.DB_PWD = process.env.DB_PWD;
exports.DB_SSL_ENABLED = process.env.DB_SSL_ENABLED;
exports.DB_STRING = process.env.DB_STRING;
exports.DATABASE_URL = (process.env.DB_ENV === 'DEV') ? process.env.HEROKU_POSTGRESQL_ROSE_URL : (process.env.DB_SSL_ENABLED) ? process.env.HEROKU_POSTGRESQL_MAUVE_URL + '?sslmode=require' : process.env.HEROKU_POSTGRESQL_MAUVE_URL;
exports.STRAKER_TOKEN_DEV = process.env.STRAKER_TOKEN_DEV;
exports.STRAKER_TOKEN_PROD = process.env.STRAKER_TOKEN_PROD;
// exports.STRAKER_TOKEN = (process.env.DB_ENV === 'DEV') ? process.env.STRAKER_TOKEN_DEV : process.env.STRAKER_TOKEN_PROD;
exports.STRAKER_TOKEN = process.env.STRAKER_TOKEN_PROD;
exports.STRAKER_DOMAIN = process.env.STRAKER_DOMAIN;
// exports.STRAKER_TRANSLATION_URL = (process.env.DB_ENV === 'DEV') ? 'https://sandbox.' + process.env.STRAKER_DOMAIN : 'https://api.' + process.env.STRAKER_DOMAIN;
exports.STRAKER_TRANSLATION_URL = 'https://api.' + process.env.STRAKER_DOMAIN;
exports.STRAKER_CALLBACK_URL = (process.env.DB_ENV === 'DEV') ? '' : process.env.STRAKER_CALLBACK_URL;
exports.STRAKER_STATUS_QUEUED = 'QUEUED';
exports.STRAKER_STATUS_IN_PROGRESS = 'IN_PROGRESS';
exports.STRAKER_STATUS_COMPLETED = 'COMPLETED';
exports.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
exports.SMTP_HOST = process.env.SMTP_HOST;
exports.SMTP_USER = process.env.SMTP_USER;
exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD;
exports.CUSTOM_ORDER_EMAIL = process.env.CUSTOM_ORDER_EMAIL;
exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.SUBSCRIPTION_NAMES = {
    'DIGITAL_MENU': 'Digital Menu',
    'MULTI_DIGITAL_MENU_1': 'A la carte',
    'MULTI_DIGITAL_MENU_2': 'Menu du jour',
    'MULTI_DIGITAL_MENU_3': 'Degustation'
};
exports.DIGITAL_MENU_TRIAL_MONTH = 3;