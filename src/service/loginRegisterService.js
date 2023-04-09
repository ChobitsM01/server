import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTservice';
import { createJWT } from '../middleware/JWTaction';
let salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) =>
{
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user)
    {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) =>
{
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user)
    {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) =>
{

    try
    {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true)
        {
            return {
                EM: "This email is already exist",
                EC: 1
            }
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true)
        {
            return {
                EM: "This phone number is already exist",
                EC: 1
            }
        }

        let hashPass = hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            password: hashPass,
            phone: rawUserData.phone,
            userName: rawUserData.userName,
            groupId: 4
        })
        return {
            EM: 'A user is created succedfully!',
            EC: 0
        }
    } catch (error)
    {
        console.log(error);
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) =>
{
    return bcrypt.compareSync(inputPassword, hashPassword); //  -> true/false
}

const handleUserLogin = async (rawData) =>
{
    try
    {
        let user = await db.User.findOne({
            where: {
                [ Op.or ]: [
                    { email: rawData.account },
                    { phone: rawData.account }
                ]
            }
        })
        if (user)
        {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true)
            {
                let rolesOfGroup = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    userName: user.userName,
                    rolesOfGroup
                }

                let token = createJWT(payload);
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: {
                        access_token: token,
                        rolesOfGroup,
                        email: user.email,
                        userName: user.userName
                    }
                }
            }
        }
        return {
            EM: 'Your account or password is incorrect',
            EC: 1,
            DT: ''
        }
    } catch (error)
    {
        console.log(error);
        return {
            EM: 'Something wrongs in service',
            EC: -2
        }
    }
}

module.exports = { registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist }