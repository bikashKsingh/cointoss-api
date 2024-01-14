const express = require("express");
const router = express.Router();
const privacyPolicyController = require("../controllers/privacyPolicyController");
const privacyPolicyValidationSchema = require("../apiValidationSchemas/privacyPolicyValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createPrivacyPolicy
router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    privacyPolicyValidationSchema.createPrivacyPolicy
  ),
  privacyPolicyController.createPrivacyPolicy
);

// getPrivacyPolicy
router.get("/", privacyPolicyController.getPrivacyPolicy);

// updatePrivacyPolicy
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    privacyPolicyValidationSchema.getPrivacyPolicyById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    privacyPolicyValidationSchema.createPrivacyPolicy
  ),
  privacyPolicyController.updatePrivacyPolicy
);

module.exports = router;
