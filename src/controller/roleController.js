import userApiService from '../service/userApiService';
import roleService from '../service/roleService';

const showFunc = async (req, res) =>
{
    try
    {
        let data = await roleService.getAllRoles();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

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
        let data = await roleService.createRole(req.body);
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
``
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
        let data = await roleService.deleteRoles(req.body.id);
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

const getRoleByGroup = async (req, res) =>
{
    try
    {
        let id = req.params.groupId
        let data = await roleService.getRoleByGroup(id);
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

const assignRoleToGroup = async (req, res) =>
{
    try
    {
        let data = await roleService.assignRoleToGroup(req.body.data);
        // console.log(req.body.data);
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
module.exports = {
    showFunc, createFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup
}