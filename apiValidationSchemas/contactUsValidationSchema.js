const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createContactUs
module.exports.createContactUs = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),

  googleMapUrl: Joi.string().allow("").label("Google Map URL"),
  mobileNumber: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("Mobile Number"),
  inquiryNumber: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("Inquiry Number"),
  supportNumber: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("Support Number"),
  whatsApp: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("WhatsApp"),

  supportEmail: Joi.string().email().trim().allow("").label("Support Email"),
  inquiryEmail: Joi.string().email().trim().allow("").label("inquiry email"),

  regOfficeAddress: Joi.object({
    mobileNumber: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .allow("")
      .label("Reg Office Mobile"),
    landlineNumber: Joi.string().trim().allow("").label("Reg Office Landline"),
    email: Joi.string().email().trim().allow("").label("Reg Office Email"),
    address: Joi.string().trim().allow("").label("Reg Office Address"),
  })
    .allow(null)
    .allow(""),
  branchOfficeAddress: Joi.object({
    mobileNumber: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .allow("")
      .label("Branch Office Mobile"),
    landlineNumber: Joi.string()
      .trim()
      .allow("")
      .label("Branch Office Landline"),
    email: Joi.string().email().trim().allow("").label("Branch Office Email"),
    address: Joi.string().trim().allow("").label("Branch Office Address"),
  })
    .allow(null)
    .allow(""),
  factoryAddress: Joi.object({
    mobileNumber: Joi.string()
      .regex(/^[6-9]\d{9}$/)
      .allow("")
      .label("Factory Mobile"),
    landlineNumber: Joi.string().trim().allow("").label("Factory Landline"),
    email: Joi.string().email().trim().allow("").label("Factory Email"),
    address: Joi.string().trim().allow("").label("Factory Address"),
  })
    .allow(null)
    .allow(""),

  facebook: Joi.string().uri().allow("").label("Facebook"),
  instagram: Joi.string().uri().allow("").label("Instagram"),
  twitter: Joi.string().uri().allow("").label("Twitter"),
  linkedin: Joi.string().uri().allow("").label("LinkedIn"),
  youtube: Joi.string().uri().allow("").label("YouTube"),
  pintrest: Joi.string().uri().allow("").label("Pintrest"),

  seoTitle: Joi.string().allow("").label("SEO Title"),
  seoDescription: Joi.string().allow("").label("SEO Description"),
  seoKeywords: Joi.string().allow("").label("SEO Keywords"),
  image: Joi.string().allow("").label("Image"),
});

// getContactUsById
module.exports.getContactUsById = Joi.object({
  id: Joi.custom(customCallback),
});
