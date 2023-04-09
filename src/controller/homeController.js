import userService from '../service/userService';

const helloWord = (req, res) =>
{
    return res.render("home.ejs")
}

const userPage = async (req, res) =>
{
    console.log('cookie: ', req.cookies);

    res.cookie('test', 'abc')

    let listUser = await userService.getListUser();
    return res.render("user.ejs", { listUser });
}

const handleCreateNewUser = (req, res) =>
{
    let { email, password, name } = req.body;
    userService.createNewUser(email, password, name);
    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) =>
{
    await userService.deleteUser(req.params.id);
    res.redirect('/user')
}

const getUpdateUserPage = async (req, res) =>
{
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    res.render('updateUser.ejs', { userData });
}

const handleUpdateUserInfo = async (req, res) =>
{
    let { id, email, name } = req.body;
    await userService.updateUserInfo(id, email, name);
    res.redirect('/user')
}
module.exports = {
    helloWord, userPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUserInfo
}