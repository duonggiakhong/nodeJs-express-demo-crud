import { Express } from 'express';
import configViewEngine from './configs/ViewEngine';

const express = require('express')
const path = require('path');
const app = express()
const port = 8080

configViewEngine(app);

app.get('/', (req, res) => {
    res.send('Hello "Gia Cat TS"')
})

app.get('/index.ejs', (req, res) => {
    res.render('index.ejs')
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
