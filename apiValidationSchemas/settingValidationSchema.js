const Joi = require("joi");

// createSetting
module.exports.createSetting = Joi.object({
  minimumwithdrawalAmount: Joi.number()
    .allow("")
    .label("Minimum withdrawal amount"),
  referralAmount: Joi.number().allow("").label("Referral amount"),
  referredAmount: Joi.number().allow("").label("Referred amount"),
  gameResult: Joi.string()
    .valid("ALWAYS_HEAD", "ALWAYS_TAIL", "RANDOM")
    .label("Game Result"),
  supportEmail: Joi.string().email().allow("").label("Support Email"),
  supportMobile: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("Support Mobile"),
  supportWhatsapp: Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .allow("")
    .label("Support WhatsApp"),
  officeAddress: Joi.number().allow("").label("Office Address"),
  facebook: Joi.string().uri().allow("").label("Facebook"),
  twitter: Joi.string().uri().allow("").label("Twitter"),
  instagram: Joi.string().uri().allow("").label("Instagram"),
  youtube: Joi.string().uri().allow("").label("Youtube"),
});
