import connection from "../configs/connectDB";

let getHomePage = (req, res) => {
    //logic
    //3 creat variable data
    let data = [];
    //3 connect database
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            console.log('check mysql:')
            console.log(results); // results contains rows returned by server
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstName: row.firstName,
                    lastName: row.lastName,
                })
            });
            // console.log('check mysql:', data)
            return res.render('index.ejs', { dataUser: data })
        }
    );

}





let getAboutPage = (req, res) => {
    //logic
    return res.send('Hello "Gia Cat TS"');
}

module.exports = {
    getHomePage,
    getAboutPage
}