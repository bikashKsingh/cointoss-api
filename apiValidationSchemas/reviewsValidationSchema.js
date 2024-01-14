const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createReview
module.exports.createReview = Joi.object({
  product: Joi.string().custom(customCallback).required().label("Product"),
  ratings: Joi.number().allow("").label("Ratings").required(),
  comment: Joi.string().allow("").label("Comment"),
});

// getAllReviews
module.exports.getAllReviews = Joi.object({
  page: Joi.number().label("Page"),
  limit: Joi.number().label("Limit"),
  status: Joi.string().valid("true", "false", "All").label("Status"),
  searchQuery: Joi.string().allow("").label("Search query"),
  reviewStatus: Joi.string()
    .allow("")
    .valid("PENDING", "APPROVED", "All")
    .label("Review Status"),
  product: Joi.custom(customCallback).label("Product"),
  ratings: Joi.string().label("Ratings"),
});

// getReviewById
module.exports.getReviewById = Joi.object({
  id: Joi.string().custom(customCallback).label("Id"),
});

// updateReviewByUser
module.exports.updateReviewByUser = Joi.object({
  product: Joi.string().custom(customCallback).required().label("Product"),
  ratings: Joi.number().allow("").label("Ratings").label("Ratings"),
  comment: Joi.string().allow("").label("Comment"),
});

// updateReview
module.exports.updateReview = Joi.object({
  ratings: Joi.number().allow("").label("Ratings"),
  comment: Joi.string().allow("").label("Comment"),
  reviewStatus: Joi.string()
    .valid("PENDING", "APPROVED")
    .required()
    .label("Review Status"),
  status: Joi.boolean().label("Status"),
});
