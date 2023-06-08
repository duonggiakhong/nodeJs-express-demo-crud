
let getHomePage = (req, res) => {
    //logic
    res.render('test/index.ejs')
}

let getAboutPage = (req, res) => {
    //logic
    return res.send('Hello "Gia Cat TS"');
}

module.exports = {
    getHomePage,
    getAboutPage
}