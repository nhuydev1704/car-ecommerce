const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Contact = require('../models/contact.model');

/**
 * Create a user
 * @param {Object} categoryBody
 * @returns {Promise<User>}
 */
const createContact = async (contactBody) => {
  return Contact.create(contactBody);
};

const queryContacts = async (filter, options) => {
  const contacts = await Contact.paginate(filter, {
    ...options,
  });
  return contacts;
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'contact not found');
  }

  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

const deleteContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'contact not found');
  }
  await contact.remove();
};

module.exports = {
  createContact,
  queryContacts,
  deleteContact,
  updateContactById,
};
