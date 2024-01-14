const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createNewsletter
module.exports.createNewsletter = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

// getAllNewsletters
module.exports.getAllNewsletters = Joi.object({
  page: Joi.number().optional().label("Page"),
  limit: Joi.number().optional().label("Limit"),
  status: Joi.string().optional().label("Status"),
  searchQuery: Joi.string().optional().label("Search Query"),
});

// getNewsletterById
module.exports.getNewsletterById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateNewsletter
module.exports.updateNewsletter = Joi.object({
  email: Joi.string().optional().label("Email"),
  status: Joi.boolean().optional().label("Status"),
});

// deleteNewsletter
module.exports.deleteNewsletter = Joi.object({
  id: Joi.string().custom(customCallback),
});
