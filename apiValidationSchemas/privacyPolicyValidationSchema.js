const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createPrivacyPolicy
module.exports.createPrivacyPolicy = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  seoKeywords: Joi.string().allow("").label("SEO Keywords"),
  image: Joi.string().allow("").label("Image"),
});

// getPrivacyPolicyById
module.exports.getPrivacyPolicyById = Joi.object({
  id: Joi.custom(customCallback),
});
