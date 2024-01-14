const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminValidationSchema = require("../apiValidationSchemas/adminValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// registerAdmin
router.post(
  "/register",
  joiSchemaValidation.validateBody(adminValidationSchema.registerAdmin),
  adminController.registerAdmin
);

// loginAdmin
router.post(
  "/login",
  joiSchemaValidation.validateBody(adminValidationSchema.loginAdmin),
  adminController.loginAdmin
);

// findAccount
router.post(
  "/findAccount",
  joiSchemaValidation.validateBody(adminValidationSchema.findAccount),
  adminController.findAccount
);

// verifyOTP
router.post(
  "/verifyOTP",
  joiSchemaValidation.validateBody(adminValidationSchema.verifyOTP),
  adminController.verifyOTP
);

// getProfile
router.get(
  "/profile",
  jwtValidation.validateAdminToken,
  adminController.getProfile
);

// createNewPassword
router.put(
  "/createNewPassword",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(adminValidationSchema.createNewPassword),
  adminController.createNewPassword
);

// updateProfile
router.put(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(adminValidationSchema.updateProfile),
  adminController.updateProfile
);

module.exports = router;
