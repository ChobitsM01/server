
import express from "express";
import apiController from "../controller/apiController";
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRoutes = (app) =>
{
    router.get("/", homeController.helloWord);
    router.get("/user", homeController.userPage);
    router.post("/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/update-user", homeController.handleUpdateUserInfo);

    return app.use("/", router)
}

export default initWebRoutes;