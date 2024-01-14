const Joi = require("joi");

// registerAdmin
module.exports.registerAdmin = Joi.object({
  name: Joi.string().trim().required().min(3),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    }),
});

// loginAdmin
module.exports.loginAdmin = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    }),
});

// updateProfile
module.exports.updateProfile = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  mobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .messages({
      "string.empty": `"Mobile" must contain value`,
      "string.pattern.base": `"Mobile" must be a valid Number`,
    }),

  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Password" must be a mix of number, char, and special char`,
    }),
  oldPassword: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .min(6)
    .messages({
      "string.empty": `"oldPassword" must not be empty`,
      "string.pattern.base": `"oldPassword" must be a mix of number, char, and special char`,
    }),
});

// findAccount
module.exports.findAccount = Joi.object({
  email: Joi.string().email().trim().required(),
});

// verifyOTP
module.exports.verifyOTP = Joi.object({
  email: Joi.string().email().trim().required(),
  otp: Joi.string().trim().required().min(4),
});

// createNewPassword
module.exports.createNewPassword = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&@? "])[a-zA-Z0-9!#$%&@?]{6,20}$/
    )
    .required()
    .min(6)
    .messages({
      "string.empty": `"Password" must not be empty`,
      "string.pattern.base": `"Pasword" must be a mix of number, char, and special char`,
    }),
  cPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});
