const express = require("express");
const router = express.Router();
const termsConditionsController = require("../controllers/termsConditionsController");
const termsConditionsValidationSchema = require("../apiValidationSchemas/termsConditionsValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createTermsConditions
router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    termsConditionsValidationSchema.createTermsConditions
  ),
  termsConditionsController.createTermsConditions
);

// getTermsConditions
router.get("/", termsConditionsController.getTermsConditions);

// updateTermsConditions
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    termsConditionsValidationSchema.getTermsConditionsById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    termsConditionsValidationSchema.createTermsConditions
  ),
  termsConditionsController.updateTermsConditions
);

module.exports = router;
