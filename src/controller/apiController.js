import pool from "../configs/connectDB";
let getAllUsers = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: rows,
    })
}
let CreateNewuser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params',
        })
    }
    await pool.execute('INSERT INTO users (firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'giacat',
    })
}
let Updatauser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params',
        })
    }
    await pool.execute('UPDATE users SET firstName = ?, lastName= ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'giacat',
    })
}

let Deleteuser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params',
        })
    }
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.status(200).json({
        message: 'giacat',
    })
}
module.exports = {
    getAllUsers,
    CreateNewuser,
    Deleteuser,
    Updatauser,
}