
import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import roleController from "../controller/roleController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from '../middleware/JWTaction';

const router = express.Router();


const initApiRoutes = (app) =>
{
    router.all('*', checkUserJWT, checkUserPermission);

    //Authen
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);

    //user
    router.get('/account', userController.getUserAccount);
    router.get('/users/read', userController.showFunc);
    router.post('/users/create', userController.createFunc);
    router.put('/users/update', userController.updateFunc);
    router.delete('/users/delete', userController.deleteFunc);

    //role
    router.get('/role/read', roleController.showFunc);
    router.post('/role/create', roleController.createFunc);
    router.put('/role/update', roleController.updateFunc);
    router.delete('/role/delete', roleController.deleteFunc);
    router.get('/role/by-group/:groupId', roleController.getRoleByGroup);
    router.post('/role/assign-to-group', roleController.assignRoleToGroup);

    //group
    router.get('/group/read', groupController.showFunc);

    return app.use("/api/v1", router)
}

export default initApiRoutes;