require('dotenv').config();

const app = require('./src/app');

const port = +process.env.APP_PORT || 3001;

app.listen(port, () => {
    console.log(`Freshloka API listening on port ${port}`);
});
