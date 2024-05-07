const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(contact);
});

const getContacts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const search = (filter.name || '');

  const statusFilter =
    req.query.status !== undefined
      ? {
        status: req.query.status,
      }
      : {};

  const result = await contactService.queryContacts(
    {
      $or: [
        { "full_name": { "$regex": `^${search}`, "$options": "i" } },
        { "phone": { "$regex": `^${search}`, "$options": "i" } },
        { "address": { "$regex": `^${search}`, "$options": "i" } }
      ],
      ...statusFilter,
    },
    options
  )
  res.send(result);
});

const updateContact = catchAsync(async (req, res) => {
  const contact = await contactService.updateContactById(req.params.contactId, req.body);

  res.send(contact);
});

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

const deleteContact = catchAsync(async (req, res) => {
  await contactService.deleteContact(req.params.contactId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
