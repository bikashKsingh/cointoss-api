const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// registerCustomer
module.exports.registerCustomer = Joi.object({
  firstName: Joi.string().trim().required().min(2),
  lastName: Joi.string().trim().allow(""),
  email: Joi.string().email().trim().required(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .required(),
  password: Joi.string().min(5).trim().required(),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  referralCode: Joi.string().trim().allow(""),
});

// verifyAccount
module.exports.verifyAccount = Joi.object({
  email: Joi.string().email().trim().required(),
  otp: Joi.number().required(),
});

// resendOTP
module.exports.resendOTP = Joi.object({
  email: Joi.string().email().trim().required(),
});

// loginCustomer
module.exports.loginCustomer = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(5).trim().required(),
});

// getAllCustomers
module.exports.getAllCustomers = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string().optional(),
  isDeleted: Joi.boolean().optional(),
  searchQuery: Joi.string(),
  isVerified: Joi.string(),
});

// getCustomerReferrals
module.exports.getCustomerReferrals = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string().optional(),
  isDeleted: Joi.boolean().optional(),
  searchQuery: Joi.string(),
  isVerified: Joi.string(),
});

// getCustomerById
module.exports.getCustomerById = Joi.object({
  id: Joi.custom(customCallback),
});

// updateProfile
module.exports.updateProfile = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  mobile: Joi.string().trim().min(10),
  email: Joi.string().email().trim(),
  password: Joi.string().allow("").min(6).trim(),
  oldPassword: Joi.string().allow("").min(6).trim(),
  address: Joi.string().trim().allow("").label("Address"),
  landmark: Joi.string().trim().allow("").label("Landmark"),
  locality: Joi.string().trim().allow("").label("Locality"),
  country: Joi.string().trim().allow("").label("Country"),
  state: Joi.string().trim().allow("").label("State"),
  city: Joi.string().trim().allow("").label("City"),
  pincode: Joi.string().trim().allow("").label("Pincode"),
});

// findAccount
module.exports.findAccount = Joi.object({
  email: Joi.string().email().trim().required(),
});

// verifyOTP
module.exports.verifyOTP = Joi.object({
  email: Joi.string().email().trim().required(),
  otp: Joi.number().min(4).required(),
});

// createNewPassword
module.exports.createNewPassword = Joi.object({
  password: Joi.string().min(5).trim().required(),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

// updateCustomer
module.exports.updateCustomer = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().email().trim(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
    }),
  status: Joi.boolean(),
  isVerified: Joi.boolean(),
});
