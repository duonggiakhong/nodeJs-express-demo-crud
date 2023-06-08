import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();
const initwebRouter = (app) => {
    router.get('/about', homeController.getAboutPage)
    router.get('/', homeController.getHomePage)

    return app.use('/', router);
}

export default initwebRouter;
