import express from "express";
import apiController from "../controller/apiController";
let router = express.Router();

const initApiRouter = (app) => {

    router.get('/users', apiController.getAllUsers); //method GET => read data
    router.post('/Create-New-user', apiController.CreateNewuser); //method GET => read data
    router.put('/update-New-user', apiController.Updatauser); //method GET => read data
    router.delete('/delete-New-user/:id', apiController.Deleteuser); //method GET => read data
    return app.use('/api/v1/', router);
}

export default initApiRouter;
