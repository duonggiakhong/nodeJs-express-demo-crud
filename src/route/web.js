import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();
const initwebRouter = (app) => {
    router.get('/about', homeController.getAboutPage)
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.get('/', homeController.getHomePage);
    router.post('/create-new-user', homeController.CreateNewuser);

    return app.use('/', router);
}

export default initwebRouter;
