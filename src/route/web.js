import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/');//address save file 
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let router = express.Router();
const initwebRouter = (app) => {
    router.get('/about', homeController.getAboutPage)
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.get('/', homeController.getHomePage);
    //create user new
    router.post('/create-new-user', homeController.CreateNewuser);
    //delete user 
    router.post('/delete-user', homeController.deleteUser);
    //edit-user
    router.get('/edit-user/:id', homeController.editUser);
    //update user
    router.post('/update-user', homeController.updateUserPage);
    //uploadFile
    router.get('/uploadfile', homeController.uploadFilePage);

    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);

    router.post('/upload-multiple-images', upload.array('multiple_images', 10), homeController.handleUploadMultipleFile);


    return app.use('/', router);
}

export default initwebRouter;
