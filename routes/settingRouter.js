const express = require("express");
const settingRouter = express.Router();

const settingController = require("../controllers/settingController");
const {
  createSetting,
} = require("../apiValidationSchemas/settingValidationSchema");
const { validateBody } = require("../middlewares/joiSchemaValidation");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createUpdateSetting
settingRouter.post(
  "/",
  validateBody(createSetting),
  validateAdminToken,
  settingController.createUpdateSetting
);

//getSetting
settingRouter.get("/", settingController.getSetting);

module.exports = settingRouter;
