import express from 'express';
import configViewEngine from './configs/ViewEngine';
//2
require('dotenv').config();

const path = require('path');
const app = express()
//2
const port = process.env.PORT || 6969;

configViewEngine(app);

app.get('/about', (req, res) => {
    res.send('Hello "Gia Cat TS"')
})

app.get('/', (req, res) => {
    res.render('test/index.ejs')
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
