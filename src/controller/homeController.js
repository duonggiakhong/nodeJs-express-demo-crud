// import { json } from "body-parser";
//connect dataBase
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

//create user new 
let CreateNewuser = async (req, res) => {

    let { firstName, lastName, email, address } = req.body;
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address]);
    //
    return res.redirect('/');
}

//delete user
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.redirect('/');
}

//edit user
let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}

//update user 
let updateUserPage = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('UPDATE users SET firstName = ?, lastName= ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getAboutPage,
    getDetailPage,
    CreateNewuser,
    deleteUser,
    editUser,
    updateUserPage,


}