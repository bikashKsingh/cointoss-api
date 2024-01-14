const express = require("express");
const router = express.Router();
const aboutUsController = require("../controllers/aboutUsController");
const aboutUsValidationSchema = require("../apiValidationSchemas/aboutUsValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createAboutUs
router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(aboutUsValidationSchema.createAboutUs),
  aboutUsController.createAboutUs
);

// getAboutUs
router.get("/", aboutUsController.getAboutUs);

// updateAboutUs
router.put(
  "/:id",
  joiSchemaValidation.validateParams(aboutUsValidationSchema.getAboutUsById),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(aboutUsValidationSchema.createAboutUs),
  aboutUsController.updateAboutUs
);

module.exports = router;
