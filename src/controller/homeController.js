// import { json } from "body-parser";
//connect dataBase
import pool from "../configs/connectDB";
import multer from "multer";

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

//uploadFile
let uploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs');
};

//upload file single
let handleUploadFile = async (req, res) => {
    console.log(req.file);

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/uploadfile">Upload another image</a>`);
}

// uploadMultip file
let handleUploadMultipleFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/uploadfile">Upload more images</a>';
    res.send(result);
};


module.exports = {
    getHomePage,
    getAboutPage,
    getDetailPage,
    CreateNewuser,
    deleteUser,
    editUser,
    updateUserPage,
    uploadFilePage,
    handleUploadFile,
    handleUploadMultipleFile,


}