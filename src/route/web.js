import express from "express";
import homeController from "../controller/homeController";
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
    return app.use('/', router);
}

export default initwebRouter;
