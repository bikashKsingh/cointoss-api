const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// getAllWallets
module.exports.getAllWallets = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  status: Joi.string().optional(),
  searchQuery: Joi.string().allow("").optional(),
  customer: Joi.string().custom(customCallback),
});
