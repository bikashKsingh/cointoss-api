const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createAboutUs
module.exports.createAboutUs = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  missionTitle: Joi.string().allow("").label("Mission Title"),
  missionDescription: Joi.string().allow("").label("Mission Description"),

  visionTitle: Joi.string().allow("").label("Vision Title"),
  visionDescription: Joi.string().allow("").label("Vision Description"),

  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  seoKeywords: Joi.string().allow("").label("SEO Keywords"),
  image: Joi.string().allow("").label("Image"),
});

// getAboutUsById
module.exports.getAboutUsById = Joi.object({
  id: Joi.custom(customCallback),
});
