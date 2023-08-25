require('dotenv').config();
const app = require('./app/app');
const connectDb = require('./db');

const PORT = process.env.PORT || 8000;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';

(async () => {
    try {
        console.log('Database connected!');
        await connectDb(`mongodb://${MONGO_HOST}:27017/palette-db`);
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
})();
