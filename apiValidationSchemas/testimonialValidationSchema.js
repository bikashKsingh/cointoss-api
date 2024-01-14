const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createTestimonial
module.exports.createTestimonial = Joi.object({
  name: Joi.string().required().label("Name"),
  comment: Joi.string().allow("").label("Comment"),
  designation: Joi.string().allow("").label("Designation"),
  image: Joi.string().allow("").label("Image"),
});

// getAllTestimonials
module.exports.getAllTestimonials = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  status: Joi.string().optional(),
  searchQuery: Joi.string().optional(),
});

// getTestimonialById
module.exports.getTestimonialById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateTestimonial
module.exports.updateTestimonial = Joi.object({
  name: Joi.string().label("Name"),
  comment: Joi.string().allow("").label("Comment"),
  designation: Joi.string().allow("").label("Designation"),
  image: Joi.string().allow("").label("Image"),
  status: Joi.boolean().label("Status"),
});

// deleteTestimonial
module.exports.deleteTestimonial = Joi.object({
  id: Joi.string().custom(customCallback),
});
