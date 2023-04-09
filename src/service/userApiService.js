import db from '../models/index';
import { hashUserPassword, checkEmailExist, checkPhoneExist } from './loginRegisterService';

const getAllUsers = async () =>
{
    try
    {
        let users = await db.User.findAll({
            attributes: [ "id", "userName", "email", 'sex', 'phone', 'address' ],
            include: { model: db.Group, attributes: [ "name", "description" ] },
        });
        if (users)
        {
            let data = users;
            return {
                EM: 'Get data success',
                EC: 0,
                DT: data
            }
        }
        else
        {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error)
    {
        console.log(error);
        return {
            EM: 'Something wrongs from service',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) =>
{
    try
    {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [ "id", "userName", "email", 'phone', 'sex', 'address' ],
            include: { model: db.Group, attributes: [ "name", "description", 'id' ] },
            order: [ [ 'id', 'desc' ] ]
        })

        let totalPage = Math.ceil(count / limit);
        let data = { totalRows: count, totalPage: totalPage, users: rows };
        return {
            EM: 'Get data success',
            EC: 0,
            DT: data
        }
    } catch (e)
    {
        console.log(e);
        return {
            EM: 'Something wrongs from services',
            EC: 1,
            DT: []
        }
    }
}

const createUser = async (data) =>
{
    try
    {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true)
        {
            return {
                EM: "This email is already exist",
                EC: 1,
                DT: 'email'
            }
        }

        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true)
        {
            return {
                EM: "This phone number is already exist",
                EC: 1,
                DT: 'phone'
            }
        }

        let hashPass = hashUserPassword(data.password);
        await db.User.create({ ...data, password: hashPass });
        return {
            EM: 'Create usersuccess',
            EC: 0,
            DT: data
        }
    } catch (error)
    {
        console.log(error);
    }
}

const updateUser = async (data) =>
{
    try
    {
        if (!data.groupId)
        {
            return {
                EM: 'Error with empty groupid',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user)
        {
            await user.update({
                userName: data.userName,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user succeed!',
                EC: 0,
                DT: ''
            }
        }
        else
        {
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }
    } catch (error)
    {
        return {
            EM: 'Something wrongs from service',
            EC: 1,
            DT: ''
        }
    }
}

const deleteUser = async (id) =>
{
    try
    {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user)
        {
            await user.destroy();
            return {
                EM: 'Delete user success',
                EC: 0,
                DT: []
            }
        }
        else
        {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error)
    {
        console.log(error);
        return {
            EM: 'Something wrongs from services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUserWithPagination };
