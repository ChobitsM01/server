import db from "../models";

const createRole = async (roles) =>
{
  try
  {
    let currentRole = await db.Role.findAll({
      attributes: [ 'url', 'description' ],
      raw: true
    });

    const persist = roles.filter(({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2));

    if (persist.length === 0)
    {
      return {
        EM: 'Nothing to create!',
        EC: 0,
        DT: []
      }
    }

    await db.Role.bulkCreate(roles);
    return {
      EM: `Create roles ${ persist.length } succeed!`,
      EC: 0,
      DT: []
    }

  } catch (error)
  {
    return {
      EM: 'Something wrongs from services',
      EC: 1,
      DT: []
    }
  }
}

const getAllRoles = async () =>
{
  try
  {
    let data = await db.Role.findAll({
      order: [ [ 'id', 'desc' ] ]
    });
    return {
      EM: 'Get roles succeed!',
      EC: 0,
      DT: data
    }

  } catch (error)
  {
    return {
      EM: 'Something wrongs from services',
      EC: 1,
      DT: []
    }
  }
}

const deleteRoles = async (id) =>
{
  try
  {
    let role = await db.Role.findOne({
      where: { id: id }
    })
    if (role)
    {
      await role.destroy();
      return {
        EM: 'Delete role success',
        EC: 0,
        DT: []
      }
    }

  } catch (error)
  {
    return {
      EM: 'Something wrongs from services',
      EC: 1,
      DT: []
    }
  }
}

const getRoleByGroup = async (id) =>
{
  try
  {

    if (!id)
    {
      return {
        EM: 'Not found roles!',
        EC: 0,
        DT: []
      }
    }

    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: [ 'id', 'name', 'description' ],
      include: {
        model: db.Role,
        attributes: [ 'id', 'url', 'description' ],
        through: { attributes: [] },
      }
    });
    return {
      EM: 'Get roles succeed!',
      EC: 0,
      DT: roles
    }

  } catch (error)
  {
    return {
      EM: 'Something wrongs from services',
      EC: 1,
      DT: []
    }
  }
}

const assignRoleToGroup = async (data) =>
{
  try
  {
    await db.Group_Role.destroy({
      where: { groupId: + data.groupId }
    })
    await db.Group_Role.bulkCreate(data.groupRoles);
    return {
      EM: 'Assign role to group succeed!',
      EC: 0,
      DT: []
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
module.exports = {
  createRole, getAllRoles, deleteRoles, getRoleByGroup, assignRoleToGroup
}