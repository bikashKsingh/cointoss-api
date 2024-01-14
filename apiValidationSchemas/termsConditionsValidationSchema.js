const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createTermsConditions
module.exports.createTermsConditions = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  seoKeywords: Joi.string().allow("").label("SEO Keywords"),
  image: Joi.string().allow("").label("Image"),
});

// getTermsConditionsById
module.exports.getTermsConditionsById = Joi.object({
  id: Joi.custom(customCallback),
});
