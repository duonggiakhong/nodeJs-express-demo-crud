import express from 'express';
import configViewEngine from './configs/ViewEngine';
import initwebRouter from './route/web';
//3
// import connection from './configs/connectDB';
//2
require('dotenv').config();

const path = require('path');
const app = express()
//2
const port = process.env.PORT || 6969;

//form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup viewEngine
configViewEngine(app);

//init web router
initwebRouter(app);

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
