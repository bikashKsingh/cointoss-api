const express = require("express");
const router = express.Router();
const mainMenuController = require("../controllers/mainMenuController");
const mainMenuValidationSchema = require("../apiValidationSchemas/mainMenuValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createMainMenu
router.post(
  "/",
  joiSchemaValidation.validateBody(mainMenuValidationSchema.createMainMenu),
  mainMenuController.createMainMenu
);

// getMainMenuById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(mainMenuValidationSchema.getMainMenuById),
  mainMenuController.getMainMenuById
);

// getAllMainMenus
router.get(
  "/",
  joiSchemaValidation.validateQuery(mainMenuValidationSchema.getAllMainMenus),
  mainMenuController.getAllMainMenus
);

// updateMainMenu
router.put(
  "/:id",
  joiSchemaValidation.validateParams(mainMenuValidationSchema.getMainMenuById),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(mainMenuValidationSchema.updateMainMenu),
  mainMenuController.updateMainMenu
);

// deleteMainMenu
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(mainMenuValidationSchema.getMainMenuById),
  jwtValidation.validateAdminToken,
  mainMenuController.deleteMainMenu
);

module.exports = router;
