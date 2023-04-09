import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});

let salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>
{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, name) =>
{
    let hashPass = hashUserPassword(password)
    try
    {
        await db.User.create({
            name: name,
            email: email,
            password: hashPass
        })
    } catch (error)
    {
        console.log('>>>check error: ', error)
    }
}

const getListUser = async () =>
{
    //test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: [ "id", "userName", "email" ],
        include: { model: db.Group, attributes: [ "name", "description" ] },
        raw: true,
        nest: true
    })
    let role = await db.User.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })
    let user = [];

    user = await db.User.findAll();
    return user;

}

const deleteUser = async (id) =>
{
    await db.User.destroy({
        where: { id }
    });

}

const getUserById = async (id) =>
{
    let user = {};
    user = await db.User.findOne({
        where: { id }
    });
    return user.get({ plain: true });

}

const updateUserInfo = async (id, email, name) =>
{
    await db.User.update(
        { email, name }, { where: { id } }
    )
}

module.exports = {
    hashUserPassword, createNewUser, getListUser, deleteUser, getUserById, updateUserInfo
}