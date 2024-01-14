const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createMainMenu
module.exports.createMainMenu = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  menuType: Joi.string().valid("MEGAMENU", "LIST", "SINGLE"),
  subMenus: Joi.array().items({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    menuType: Joi.string().valid("MEGAMENU", "LIST", "SINGLE"),
    subMenus: Joi.array().items({
      title: Joi.string().required(),
      slug: Joi.string().required(),
    }),
  }),
});

// getAllMainMenus
module.exports.getAllMainMenus = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  status: Joi.string().optional(),
  searchQuery: Joi.string().optional(),
});

// getMainMenuById
module.exports.getMainMenuById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateMainMenu
module.exports.updateMainMenu = Joi.object({
  email: Joi.string().optional(),
  status: Joi.boolean().optional(),
});

// deleteMainMenu
module.exports.deleteMainMenu = Joi.object({
  id: Joi.string().custom(customCallback),
});
