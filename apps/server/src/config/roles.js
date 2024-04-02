const allRoles = {
  user: [],
  admin: ['getCategories', 'getUsers', 'manageUsers', 'getProducts', 'getIntroduce'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
