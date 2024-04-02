const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    icon: Joi.any().required(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCategory,
  getCategories,
};
