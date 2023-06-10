import { json } from "body-parser";
import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows });

}

let getAboutPage = (req, res) => {
    //logic
    return res.send('Hello "Gia Cat TS"');
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let user = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return res.send(JSON.stringify(user[0]));
}
let CreateNewuser = async (req, res) => {

    let { firstName, lastName, email, address } = req.body;
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address]);
    return res.render('/');
}

module.exports = {
    getHomePage,
    getAboutPage,
    getDetailPage,
    CreateNewuser,
}