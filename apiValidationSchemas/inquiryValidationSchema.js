const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createInquiry
module.exports.createInquiry = Joi.object({
  name: Joi.string().required().label("Name"),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .label("Mobile"),
  email: Joi.string().email().required().label("Email"),
  product: Joi.string().custom(customCallback).label("Product"),
  webpage: Joi.string().allow("").label("Webpage"),
  message: Joi.string().allow("").label("Message"),
  inquiryStatus: Joi.string()
    .valid("OPEN", "INPROGRESS", "PENDING", "CLOSED", "")
    .label("Inquiry Status"),
});

// getAllInquiries
module.exports.getAllInquiries = Joi.object({
  page: Joi.number().optional().label("Page"),
  limit: Joi.number().optional().label("Limit"),
  status: Joi.string().optional().label("Status"),
  inquiryStatus: Joi.string()
    .optional()
    .valid("All", "OPEN", "INPROGRESS", "PENDING", "CLOSED")
    .label("Inquiry Status"),
  searchQuery: Joi.string().optional().label("Search Query"),
});

// getInquiryById
module.exports.getInquiryById = Joi.object({
  id: Joi.string().custom(customCallback).label("ID"),
});

// updateInquiry
module.exports.updateInquiry = Joi.object({
  name: Joi.string().label("Name"),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .label("Mobile"),
  email: Joi.string().email().label("Email"),
  product: Joi.string().custom(customCallback).label("Product"),
  webpage: Joi.string().allow("").label("Webpage"),
  message: Joi.string().allow("").label("Message"),
  status: Joi.boolean().label("Status"),
  inquiryStatus: Joi.string()
    .valid("OPEN", "INPROGRESS", "PENDING", "CLOSED", "")
    .label("Inquiry Status"),
});

// deleteInquiry
module.exports.deleteInquiry = Joi.object({
  id: Joi.string().custom(customCallback).label("ID"),
});
