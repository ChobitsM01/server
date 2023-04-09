import userApiService from '../service/userApiService';

const showFunc = async (req, res) =>
{
    try
    {
        if (req.query.page && req.query.limit)
        {
            let page = req.query.page, limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else
        {
            let data = await userApiService.getAllUsers();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({
            EM: 'Something wrongs from services',
            EC: -1,
            DT: []
        })
    }
}

const createFunc = async (req, res) =>
{
    try
    {
        let data = await userApiService.createUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error)
    {
        console.log(error);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
}

const updateFunc = async (req, res) =>
{
    try
    {
        let data = await userApiService.updateUser(req.body);
        console.log(data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error)
    {
        console.log(error);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
}

const deleteFunc = async (req, res) =>
{
    try
    {
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error)
    {
        console.log(error);
        return res.status(200).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        })
    }
}

const getUserAccount = (req, res) =>
{
    return res.status(200).json({
        EC: 0,
        DT: {
            access_token: req.token,
            email: req.user.email,
            userName: req.user.userName,
            rolesOfGroup: req.user.rolesOfGroup,
        },
        EM: 'ok'
    })
}
module.exports = {
    showFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}